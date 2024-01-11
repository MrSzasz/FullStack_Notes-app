import { toast } from '@/components/ui/use-toast'
import type { notesType } from '@/types/notes'

/**
 * Retrieves notes from the specified URL.
 *
 * @param {string} url - The URL to fetch the notes from.
 * @return {Promise<notesType[]>} A promise that resolves to an array of notes.
 */
export const getNotes = async (url: string): Promise<notesType[]> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error retrieving notes:', error)
    throw error
  }
}

/**
 * Handles adding a note.
 *
 * @param {Omit<notesType, 'id'>} noteForBody - The note to be added, without an ID.
 * @param {string} url - The URL to send the POST request to.
 * @return {Promise<notesType | undefined>} The added note, or undefined if an error occurred.
 */
export const createNote = async (
  noteForBody: Omit<notesType, 'id'>,
  url: string,
): Promise<notesType | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteForBody),
    })

    const data = await res.json()

    toast({
      duration: 2000,
      description: data?.message,
    })

    return data.note
  } catch (err) {
    console.error(err)

    toast({
      duration: 3000,
      variant: 'destructive',
      description: 'Something went wrong. Please try again later.',
    })
  }
}

/**
 * Updates a note in the notes array and sends a PUT request to the specified URL.
 *
 * @param {notesType[]} currentNotes - The current array of notes.
 * @param {notesType} noteForBody - The note to be updated.
 * @param {string} url - The URL to send the PUT request to.
 * @return {Promise<notesType[] | undefined>} The updated array of notes if successful, undefined otherwise.
 */
export const editNote = async (
  currentNotes: notesType[],
  noteForBody: notesType,
  url: string,
): Promise<notesType[] | undefined> => {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteForBody),
    })

    const newNotes = currentNotes.map(noteInArray => {
      if (noteInArray.id === noteForBody.id) {
        return noteForBody
      } else {
        return noteInArray
      }
    })

    return newNotes
  } catch (err) {
    console.error(err)

    toast({
      duration: 3000,
      variant: 'destructive',
      description: 'Something went wrong. Please try again later.',
    })
  }
}

/**
 * Deletes a note from the currentNotes array and the server.
 *
 * @param {notesType[]} currentNotes - The array of current notes.
 * @param {string} id - The ID of the note to be deleted.
 * @param {string} url - The URL of the server.
 * @return {Promise<notesType[] | undefined>} A promise that resolves to the updated array of notes, or undefined if an error occurred.
 */
export const deleteNote = async (
  currentNotes: notesType[],
  id: string,
  url: string,
): Promise<notesType[] | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    const data = await res.json()

    const newNotes = currentNotes.filter(note => note.id !== id)

    toast({
      duration: 2000,
      description: data?.message,
    })
    return newNotes
  } catch (err) {
    console.error(err)

    toast({
      duration: 3000,
      variant: 'destructive',
      description: 'Something went wrong. Please try again later.',
    })
  }
}
