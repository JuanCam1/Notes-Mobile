import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { FileText, Plus } from "lucide-react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface EmptyStateProps {
	title?: string;
	message?: string;
}

export function EmptyState({
	title = "No hay notas",
	message = "Crea tu primera nota para comenzar",
}: EmptyStateProps) {
	return (
		<Animated.View
			entering={FadeIn.duration(500)}
			className="flex-1 justify-center items-center p-6"
		>
			<View className="items-center">
				<View className="p-4 bg-primary-100 rounded-full mb-4">
					<FileText size={40} color="#0ea5e9" />
				</View>
				<Text className="text-xl font-semibold text-neutral-800 dark:text-neutral-400 mb-2 text-center">
					{title}
				</Text>
				<Text className="text-neutral-600 dark:text-neutral-500 text-center mb-6 max-w-60">
					{message}
				</Text>
				<Pressable
					onPress={() => router.push("/create")}
					className="flex-row items-center bg-primary-500 px-5 py-3 rounded-lg"
				>
					<Plus size={18} color="white" />
					<Text className="text-white font-medium ml-2">Crear Nota</Text>
				</Pressable>
			</View>
		</Animated.View>
	);
}
