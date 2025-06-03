import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Search, X } from "lucide-react-native";
import { TextInput } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNotesStore } from "@/store/useNoteStore";
import { filters } from "@/data/filter-data";

export function FilterBar() {
	const { filter, setFilter, searchQuery, setSearchQuery } = useNotesStore();
	const [showSearch, setShowSearch] = useState(false);

	const toggleSearch = () => {
		if (showSearch && searchQuery) {
			setSearchQuery("");
		}
		setShowSearch(!showSearch);
	};

	const filterArchivbed = filters.slice(0, 3);

	return (
		<View className="mb-4">
			<View className="flex-row justify-between items-center mb-3">
				<Text className="text-2xl font-semibold text-neutral-800 dark:text-neutral-400">
					Mis Notas
				</Text>
				<View className="flex-row gap-2">
					<Pressable
						onPress={toggleSearch}
						className="p-2 bg-neutral-100 rounded-full"
						hitSlop={8}
					>
						{!showSearch || !searchQuery ? (
							<Search size={18} color="#64748b" />
						) : (
							<X size={18} color="#64748b" />
						)}
					</Pressable>
				</View>
			</View>

			{showSearch && (
				<Animated.View
					entering={FadeIn.duration(300)}
					exiting={FadeOut.duration(300)}
					className="mb-3"
				>
					<View className="flex flex-row items-center h-12 border border-zinc-600 rounded-md overflow-hidden">
						<View className="flex justify-center items-center px-3 py-2 h-full border border-r-0 rounded-l-md bg-white dark:bg-zinc-900">
							<Search size={16} color="#9CA3AF" />
						</View>
						<TextInput
							className="h-full flex-1 text-md p-2.5 pl-3 border-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
							value={searchQuery}
							placeholder="Buscar notas..."
							autoFocus
							placeholderTextColor="#9CA3AF"
						/>
						{searchQuery ? (
							<Pressable onPress={() => setSearchQuery("")}>
								<X size={16} color="#94a3b8" />
							</Pressable>
						) : null}
					</View>
				</Animated.View>
			)}

			<View className="flex flex-row gap-2 justify-end mt-6">
				{filterArchivbed.map((item) => {
					const isActive = filter === item.value;
					return (
						<Pressable
							key={item.value}
							onPress={() => setFilter(item.value)}
							className={`mr-2 px-2 py-2 rounded-full border ${
								isActive
									? "bg-blue-500 border-blue-500 "
									: "bg-transparent  border-neutral-200"
							}`}
						>
							<Text
								className={`${
									isActive ? "text-white" : "text-black dark:text-neutral-300"
								} font-medium`}
							>
								{item.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
