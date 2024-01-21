import { pool } from '../src/db'
import type { notesType } from '../types/dict'

/**
 * Retrieves all notes for a specific user from the database.
 *
 * @param {string} userId - The ID of the user whose notes are to be retrieved.
 * @return {Promise<notesType[] | []>} The retrieved notes or an empty array.
 */
export const getAllNotes = async (
  userId: string,
): Promise<notesType[] | []> => {
  try {
    let notes
    const [rows]: any = await pool.query(
      'SELECT * FROM notes WHERE user_id = ?',
      [userId],
    )

    if (rows.length === 0) {
      notes = []
    } else notes = rows

    return notes
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong with the database')
  }
}

// TODO => delete this block
// export const getOneNote = async (id: string): Promise<notesType> => {
//   try {
//     const [row]: any = await pool.query('select * from notes where id = ?', [
//       id,
//     ])

//     return row
//   } catch (error) {
//     throw new Error('Note not found')
//   }
// }

/**
 * Creates a note for a given user.
 *
 * @param {notesType} note - the note to be created
 * @param {string} userId - the ID of the user
 * @return {Promise<notesType>} the created note
 */
export const createNote = async (
  note: notesType,
  userId: string,
): Promise<notesType | undefined> => {
  try {
    await pool.query(
      'INSERT INTO notes (id, title, content, user_id) VALUES (?, ?, ?, ?)',
      [note.id, note.title, note.content, userId],
    )

    return note
  } catch (err) {
    throw new Error('Something went wrong with the database')
  }
}

/**
 * Updates a note for a given user.
 *
 * @param {notesType} noteForUpdate - the note to be updated
 * @param {string} userId - the ID of the user
 * @return {Promise<notesType | Error>} the updated note or an error if the note is not found
 */
export const updateNote = async (
  noteForUpdate: notesType,
  userId: string,
): Promise<notesType | Error> => {
  const [rows]: any = await pool.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?',
    [noteForUpdate.title, noteForUpdate.content, noteForUpdate.id, userId],
  )

  if (rows.affectedRows === 0) {
    throw new Error('Note not found')
  } else {
    return noteForUpdate
  }
}

/**
 * Deletes a note from the database.
 *
 * @param {string} noteId - The ID of the note to be deleted
 * @param {string} userId - The ID of the user who owns the note
 * @return {Promise<notesType | Error>} The deleted note or an Error if the note is not found
 */
export const deleteNote = async (
  noteId: string,
  userId: string,
): Promise<notesType | Error> => {
  const noteInDB: any = await pool.query(
    'SELECT * FROM notes WHERE id = ? AND user_id = ?',
    [noteId, userId],
  )

  const [rows]: any = await pool.query(
    'DELETE FROM notes WHERE id = ? AND user_id = ?',
    [noteId, userId],
  )

  if (rows.affectedRows === 0) {
    throw new Error('Note not found')
  } else {
    return noteInDB[0]
  }
}
