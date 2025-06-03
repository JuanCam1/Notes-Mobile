import { View, SafeAreaView, FlatList, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotesStore } from "@/store/useNoteStore";
import { EmptyState } from "@/components/EmptyState";
import { NoteItem } from "@/components/NoteItem";

export default function CategoriesScreen() {
	const { notes } = useNotesStore();
	const { top } = useSafeAreaInsets();
	const notesFiltered = notes.filter((note) => note.status === "Archivado");
	const isEmpty = notesFiltered.length === 0;

	const emptyStateProps = {
		title: "No hay notas",
		message: "No hay notas archivadas en este momento.",
	};

	return (
		<SafeAreaView
			className="flex-1 bg-white dark:bg-zinc-900 px-4 "
			style={{ paddingTop: top }}
		>
			<View className="flex-row justify- items-center mb-3 mt-6">
				<Text className="text-2xl font-semibold  text-neutral-800 dark:text-blue-500">
					Mis Notas
				</Text>
			</View>
			<View className="flex-1 pt-6">
				{isEmpty ? (
					<EmptyState {...emptyStateProps} />
				) : (
					<FlatList
						data={notesFiltered}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <NoteItem note={item} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 100 }}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
