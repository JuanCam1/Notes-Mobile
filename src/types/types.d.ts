export type NoteStatus = "Activo" | "Completado" | "Archivado";

export interface Note {
	id: string;
	title: string;
	description: string;
	status: NoteStatus;
	createdAt: number;
	updatedAt: number;
}

export type NoteFilter = "Todos" | NoteStatus;

declare global {
	type NoteStatusModel = NoteStatus;
	type NoteModel = Note;
	type NoteFilterModel = NoteFilter;
}
