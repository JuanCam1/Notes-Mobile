import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Pressable,
	ActivityIndicator,
	Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Edit, Trash2 } from "lucide-react-native";
import { STATUS_COLORS } from "@/constants/theme";
import { useNotesStore } from "@/store/useNoteStore";

export default function NoteDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { notes, deleteNote } = useNotesStore();
	const [note, setNote] = useState<NoteModel | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			const foundNote = notes.find((n) => n.id === id);
			setNote(foundNote || null);
		}
		setLoading(false);
	}, [id, notes]);

	const handleDelete = async () => {
		if (id) {
			Alert.alert(
				"Eliminar nota",
				"¿Estás seguro de que deseas eliminar está notas? Esta acción no se puede deshacer.",
				[
					{
						text: "Cancelar",
						style: "cancel",
					},
					{
						text: "Eliminar",
						onPress: async () => {
							await deleteNote(id);
							router.navigate("/");
						},
						style: "destructive",
					},
				],
			);
		}
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center  bg-white dark:bg-zinc-900">
				<ActivityIndicator size="large" color="#0ea5e9" />
			</View>
		);
	}

	if (!note) {
		return (
			<View className="flex-1 justify-center items-center  bg-white dark:bg-zinc-900 p-4">
				<Text className="text-xl font-semibold text-neutral-500 dark:text-neutral-400mb-2">
					Nota no encontrada
				</Text>
				<Text className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
					La nota que estás buscando no existe o ha sido eliminada.
				</Text>
				<Pressable
					onPress={() => router.replace("/")}
					className="bg-primary-500 px-6 py-3 rounded-lg"
				>
					<Text className="text-neutral-500 dark:text-neutral-400font-medium">
						Ir al Inicio
					</Text>
				</Pressable>
			</View>
		);
	}

	const { title, description, status, createdAt, updatedAt } = note;
	const statusColors = STATUS_COLORS[status];

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<View className="flex-1 bg-white dark:bg-zinc-900">
			<View className="flex-row justify-between items-center px-3 py-6 pt-12  bg-white dark:bg-zinc-900 border-b border-neutral-300 dark:border-neutral-400 mx-4">
				<Pressable
					onPress={() => router.back()}
					className="p-2 rounded-full bg-blue-400"
					hitSlop={8}
				>
					<ChevronLeft size={24} color="white" />
				</Pressable>

				<View className="flex-row gap-4">
					<Pressable
						onPress={() => router.push(`/note/${id}/edit`)}
						className="p-2"
						hitSlop={8}
					>
						<Edit size={24} color="white" />
					</Pressable>
					<Pressable onPress={handleDelete} className="p-2" hitSlop={8}>
						<Trash2 size={24} color="#ef4444" />
					</Pressable>
				</View>
			</View>

			<ScrollView className="flex-1 p-4 mt-8">
				<View className="mb-4 flex-row">
					<Text className={`py-1 rounded-full ${statusColors.text}`}>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Text>
				</View>

				<Text className="text-2xl font-semibold text-neutral-800 dark:text-blue-500 mb-4">
					{title}
				</Text>

				<Text className="text-neutral-700 dark:text-neutral-300 mb-8 leading-6 ">
					{description}
				</Text>

				<View className="border-t border-neutral-300 dark:border-neutral-400 pt-4">
					<View className="flex-row justify-between mb-2">
						<Text className="text-blue-500 text-sm">Creado:</Text>
						<Text className="text-neutral-700 dark:text-neutral-500 text-sm">
							{formatDate(createdAt)}
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-blue-500  text-sm">
							Ultima Actualiazación:
						</Text>
						<Text className="text-neutral-700 dark:text-neutral-500 text-sm">
							{formatDate(updatedAt)}
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
