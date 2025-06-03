import { create } from "zustand";
import * as StorageService from "@/services/storage";
import { randomId } from "@/lib/random-id";

interface NotesState {
	notes: NoteModel[];
	isLoading: boolean;
	filter: NoteFilterModel;
	searchQuery: string;

	fetchNotes: () => Promise<void>;
	addNote: (title: string, description: string) => Promise<NoteModel>;
	updateNote: (id: string, data: Partial<NoteModel>) => Promise<void>;
	deleteNote: (id: string) => Promise<void>;
	updateNoteStatus: (id: string, status: NoteStatusModel) => Promise<void>;
	setFilter: (filter: NoteFilterModel) => void;
	setSearchQuery: (query: string) => void;
	archiveNote: (id: string) => Promise<void>;

	filteredNotes: () => NoteModel[];
}

export const useNotesStore = create<NotesState>((set, get) => ({
	notes: [],
	isLoading: false,
	filter: "Todos",
	searchQuery: "",

	fetchNotes: async () => {
		set({ isLoading: true });
		const notes = await StorageService.getAllNotes();
		set({ notes, isLoading: false });
	},

	addNote: async (title: string, description: string) => {
		const newNote: NoteModel = {
			id: randomId(),
			title,
			description,
			status: "Activo",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		await StorageService.addNote(newNote);
		set((state) => ({ notes: [...state.notes, newNote] }));
		return newNote;
	},

	updateNote: async (id: string, data: Partial<NoteModel>) => {
		const { notes } = get();
		const noteToUpdate = notes.find((note) => note.id === id);

		if (!noteToUpdate) return;

		const updatedNote: NoteModel = {
			...noteToUpdate,
			...data,
			updatedAt: Date.now(),
		};

		await StorageService.updateNote(updatedNote);
		set((state) => ({
			notes: state.notes.map((note) => (note.id === id ? updatedNote : note)),
		}));
	},

	deleteNote: async (id: string) => {
		await StorageService.deleteNote(id);
		set((state) => ({
			notes: state.notes.filter((note) => note.id !== id),
		}));
	},

	updateNoteStatus: async (id: string, status: NoteStatusModel) => {
		const { updateNote } = get();
		await updateNote(id, { status });
	},

	setFilter: (filter: NoteFilterModel) => {
		set({ filter });
	},

	setSearchQuery: (searchQuery: string) => {
		set({ searchQuery });
	},

	archiveNote: async (id: string) => {
		const { updateNote } = get();
		await updateNote(id, { status: "Archivado" });
	},

	filteredNotes: () => {
		const { notes, filter, searchQuery } = get();

		let filtered = notes;

		if (filter !== "Todos") {
			filtered = filtered.filter((note) => note.status === filter);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(note) =>
					note.title.toLowerCase().includes(query) ||
					note.description.toLowerCase().includes(query),
			);
		}

		return [...filtered].sort((a, b) => b.updatedAt - a.updatedAt);
	},
}));
