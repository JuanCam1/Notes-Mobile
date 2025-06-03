import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	Text,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { router } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { useNotesStore } from "@/store/useNoteStore";
import FormInput from "./FormInput";
import { STATUS_COLORS } from "@/constants/theme";

interface NoteFormProps {
	noteId?: string;
	isEditing?: boolean;
}

export function NoteForm({ noteId, isEditing = false }: NoteFormProps) {
	const { notes, addNote, updateNote } = useNotesStore();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<NoteStatusModel>("Activo");
	const [errors, setErrors] = useState({ title: "", description: "" });

	useEffect(() => {
		if (isEditing && noteId) {
			const note = notes.find((n) => n.id === noteId);
			if (note) {
				setTitle(note.title);
				setDescription(note.description);
				setStatus(note.status);
			}
		}
	}, [noteId, notes, isEditing]);

	const validateForm = (): boolean => {
		const newErrors = { title: "", description: "" };
		let isValid = true;

		if (!title.trim()) {
			newErrors.title = "El título es requerido";
			isValid = false;
		}

		if (!description.trim()) {
			newErrors.description = "La descripción es requerida";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		if (isEditing && noteId) {
			await updateNote(noteId, { title, description, status });
		} else {
			await addNote(title, description);
		}
		router.navigate("/");
	};

	const statusOptions: NoteStatusModel[] = [
		"Activo",
		"Completado",
		"Archivado",
	];

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 px-4"
		>
			<View className="flex-row items-center justify-between my-12 ">
				<Pressable
					onPress={() => router.back()}
					className="p-2 rounded-full bg-blue-400"
					hitSlop={8}
				>
					<ChevronLeft size={24} color="white" />
				</Pressable>
				<Text className="text-2xl font-semibold dark:text-blue-500">
					{isEditing ? "Editar Nota" : "Crear Nota"}
				</Text>
				<Pressable
					onPress={handleSubmit}
					className="p-2 rounded-full bg-blue-400"
					hitSlop={8}
				>
					<Check size={24} color="white" />
				</Pressable>
			</View>

			<View className="my-6 ">
				<Text className="dark:text-blue-500 mb-1 font-medium">Titulo:</Text>
				<FormInput
					value={title}
					onChangeText={setTitle}
					placeholder="Ingresa el título de la nota"
				/>
				{errors.title ? (
					<Text className="text-red-500 mt-1 text-xs">{errors.title}</Text>
				) : null}
			</View>
			<View className="h-12" />

			<View className="my-8 h-36 ">
				<Text className="dark:text-blue-500 mb-1 font-medium">
					Descripción:
				</Text>
				<TextInput
					className="h-full flex-1 text-md p-2.5 pl-3 border-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
					value={description}
					onChangeText={setDescription}
					placeholder="Ingresa descripción de la nota"
					multiline
					numberOfLines={4}
					textAlignVertical="top"
				/>
				{errors.description ? (
					<Text className="text-red-500 mt-1 text-xs">
						{errors.description}
					</Text>
				) : null}
			</View>

			{isEditing && (
				<View className="mb-4">
					<Text className="text-neutral-700 mb-2 font-medium">Status</Text>
					<View className="flex-row flex-wrap gap-2">
						{statusOptions.map((option) => {
							const statusColor = STATUS_COLORS[option];
							const isSelected = status === option;
							return (
								<Pressable
									key={option}
									onPress={() => setStatus(option)}
									className={`px-4 py-2 rounded-full border ${
										isSelected
											? `${statusColor.border}`
											: "border-neutral-500 bg-neutral-600"
									}`}
								>
									<Text
										className={isSelected ? statusColor.text : "text-white"}
									>
										{option.charAt(0).toUpperCase() + option.slice(1)}
									</Text>
								</Pressable>
							);
						})}
					</View>
				</View>
			)}
		</KeyboardAvoidingView>
	);
}
