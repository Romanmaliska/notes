import { fetchData } from "../utils/fetchData";
import { NoteInput } from "../types";
import { Note } from "../models/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetchData("/api/notes", { method: "GET" });
  return response.json();
};

export const postNote = async (note: NoteInput): Promise<Note> => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  return response.json();
};

export const updateNote = async (
  noteId: string,
  note: NoteInput
): Promise<Note> => {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  return response.json();
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await fetchData(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
};
