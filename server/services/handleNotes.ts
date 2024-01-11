import { upDB } from "../data/database";
import type { notesType } from "../types/dict";

export const getAllNotes = async (): Promise<notesType> => {
  try {
    const notes = await upDB();
    return notes.data.notes;
  } catch (error) {
    throw new Error("Something went wrong with the database");
  }
};

export const getOneNote = async (id: string): Promise<notesType> => {
  const db = await upDB();

  try {
    const note = db.data.notes.find((note: notesType) => note.id === id);

    return note;
  } catch (error) {
    throw new Error("Note not found");
  }
};

export const createNote = async (note: notesType): Promise<notesType> => {
  const db = await upDB();

  db.data.notes.push(note);

  await db.write();

  return note;
};

export const updateNote = async (
  noteForUpdate: notesType,
): Promise<notesType | Error> => {
  const db = await upDB();

  const noteIndex = db.data.notes.findIndex(
    (note: notesType) => note.id === noteForUpdate.id,
  );

  if (noteIndex === -1) {
    throw new Error("Note not found");
  }

  db.data.notes[noteIndex] = noteForUpdate;

  await db.write();

  return noteForUpdate;
};

export const deleteNote = async (
  noteID: string,
): Promise<notesType | Error> => {
  const db = await upDB();

  const noteIndex = db.data.notes.findIndex(
    (note: notesType) => note.id === noteID,
  );

  const noteInDB = db.data.notes[noteIndex];

  if (noteIndex === -1) {
    throw new Error("Note not found");
  }

  db.data.notes.splice(noteIndex, 1);

  await db.write();

  return noteInDB;
};
