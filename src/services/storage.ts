import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_STORAGE_KEY = "@notes_app_storage";

export const clearAllNotes = async () => {
	try {
		await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
	} catch (error) {
		console.error("Error clearing notes:", error);
	}
};

export async function getAllNotes(): Promise<NoteModel[]> {
	try {
		const jsonValue = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
		return jsonValue != null ? JSON.parse(jsonValue) : [];
	} catch (error) {
		console.error("Error getting notes from storage:", error);
		return [];
	}
}

export async function saveAllNotes(notes: NoteModel[]): Promise<void> {
	try {
		const jsonValue = JSON.stringify(notes);
		await AsyncStorage.setItem(NOTES_STORAGE_KEY, jsonValue);
	} catch (error) {
		console.error("Error saving notes to storage:", error);
	}
}

export async function getNoteById(id: string): Promise<NoteModel | null> {
	try {
		const notes = await getAllNotes();
		return notes.find((note) => note.id === id) || null;
	} catch (error) {
		console.error("Error getting note by id:", error);
		return null;
	}
}

export async function addNote(note: NoteModel): Promise<void> {
	try {
		const notes = await getAllNotes();
		await saveAllNotes([...notes, note]);
	} catch (error) {
		console.error("Error adding note:", error);
	}
}

export async function updateNote(updatedNote: NoteModel): Promise<void> {
	try {
		const notes = await getAllNotes();
		const updatedNotes = notes.map((note) =>
			note.id === updatedNote.id ? updatedNote : note,
		);
		await saveAllNotes(updatedNotes);
	} catch (error) {
		console.error("Error updating note:", error);
	}
}

export async function deleteNote(id: string): Promise<void> {
	try {
		const notes = await getAllNotes();
		const filteredNotes = notes.filter((note) => note.id !== id);
		await saveAllNotes(filteredNotes);
	} catch (error) {
		console.error("Error deleting note:", error);
	}
}
