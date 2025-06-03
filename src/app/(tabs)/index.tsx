import React, { useEffect } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { NoteItem } from "@/components/NoteItem";
import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { FloatingButton } from "@/components/FloatingButton";
import { useNotesStore } from "@/store/useNoteStore";

export default function HomeScreen() {
	const { fetchNotes, filteredNotes, filter, searchQuery } = useNotesStore();

	useEffect(() => {
		fetchNotes();
	}, []);

	const notes = filteredNotes();
	const isFiltered = notes.filter((note) => note.status !== "Archivado");

	const isEmpty = notes.length === 0;

	let emptyStateProps = {
		title: "No hay notas",
		message: "Crea tu primera nota para comenzar",
	};

	if (filter !== "Todos" && isEmpty) {
		emptyStateProps = {
			title: `No ${filter} notas`,
			message: `No tienes ${filter} notas todavía`,
		};
	} else if (searchQuery && isEmpty) {
		emptyStateProps = {
			title: "No hay notas coincidentes",
			message: "Intenta con un término de búsqueda diferente",
		};
	}

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
			<View className="flex-1 px-4 pt-12">
				<FilterBar />

				{isEmpty ? (
					<EmptyState {...emptyStateProps} />
				) : (
					<FlatList
						data={isFiltered}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <NoteItem note={item} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 100 }}
					/>
				)}

				<FloatingButton />
			</View>
		</SafeAreaView>
	);
}
