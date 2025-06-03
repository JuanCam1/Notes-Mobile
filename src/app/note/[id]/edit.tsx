import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { NoteForm } from "@/components/NoteForm";
import { StatusBar } from "expo-status-bar";

export default function EditNoteScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<View className="flex-1  bg-white dark:bg-zinc-900 pt-12">
			<NoteForm noteId={id} isEditing={true} />
			<StatusBar style="auto" />
		</View>
	);
}
