import { toast } from '@/components/ui/use-toast'
import type { notesType } from '@/types/notes'

/**
 * Retrieves notes from the specified URL using the provided user ID.
 *
 * @param {string} url - The URL to fetch the notes from.
 * @param {string | null | undefined} userId - The user ID to authenticate the request.
 * @return {Promise<notesType[]>} The notes retrieved from the URL.
 */
export const getNotes = async (
  url: string,
  userId: string | null | undefined,
): Promise<notesType[]> => {
  if (typeof userId === 'string') {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-id': `Bearer ${userId}`,
        },
      })
      const data = await response.json()

      return data.notes
    } catch (err) {
      console.error('Error retrieving notes:', err)
      throw err
    }
  }

  const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

  if (notesInLocalStorage === '[]') {
    localStorage.setItem('notes', JSON.stringify([]))
    return []
  }

  return JSON.parse(notesInLocalStorage)
}

/**
 * Asynchronously creates a new note and saves it to a specified URL.
 *
 * @param {Omit<notesType, 'id'>} noteForBody - The content of the note to be created
 * @param {string} url - The URL to which the note will be saved
 * @param {string | null | undefined} userId - The ID of the user creating the note
 * @return {Promise<notesType | undefined>} The newly created note, or undefined if an error occurs
 */
export const createNote = async (
  noteForBody: Omit<notesType, 'id'>,
  url: string,
  userId: string | null | undefined,
): Promise<notesType | undefined> => {
  if (typeof userId === 'string') {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-id': `Bearer ${userId}`,
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

      throw err
    }
  }

  const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

  if (notesInLocalStorage === '[]') {
    localStorage.setItem('notes', JSON.stringify([]))
  }

  const notes = JSON.parse(notesInLocalStorage)

  const newNoteWithId = {
    ...noteForBody,
    id: crypto.randomUUID(),
  }

  const newNotes = [...notes, newNoteWithId]

  localStorage.setItem('notes', JSON.stringify(newNotes))

  toast({
    duration: 2000,
    description: 'Note created successfully!',
  })

  return newNoteWithId
}

/**
 * Edit a note and update it in the current notes array or local storage.
 *
 * @param {notesType[]} currentNotes - array of current notes
 * @param {notesType} noteForBody - note to be updated
 * @param {string} url - the URL for the fetch request
 * @param {string | null | undefined} userId - the user ID for authentication
 * @return {Promise<notesType[] | undefined>} updated array of notes or undefined if error
 */
export const editNote = async (
  currentNotes: notesType[],
  noteForBody: notesType,
  url: string,
  userId: string | null | undefined,
): Promise<notesType[] | undefined> => {
  if (typeof userId === 'string') {
    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-id': `Bearer ${userId}`,
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

      throw err
    }
  }
  const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

  const notes = JSON.parse(notesInLocalStorage)

  const newNotes = notes.map((note: notesType) => {
    if (note.id === noteForBody.id) {
      return noteForBody
    } else {
      return note
    }
  })

  localStorage.setItem('notes', JSON.stringify(newNotes))

  return newNotes
}

/**
 * Deletes a note from the current notes list and updates the storage.
 *
 * @param {notesType[]} currentNotes - The current list of notes
 * @param {string} id - The id of the note to be deleted
 * @param {string} url - The URL for the delete request
 * @param {string} userId - The user ID for authentication
 * @return {Promise<notesType[] | undefined>} The updated notes list or undefined
 */
export const deleteNote = async (
  currentNotes: notesType[],
  id: string,
  url: string,
  userId: string | null | undefined,
): Promise<notesType[] | undefined> => {
  if (typeof userId === 'string') {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-id': `Bearer ${userId}`,
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

      throw err
    }
  }
  const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

  const notes = JSON.parse(notesInLocalStorage)

  const newNotes = notes.filter((note: notesType) => note.id !== id)

  localStorage.setItem('notes', JSON.stringify(newNotes))

  toast({
    duration: 2000,
    description: 'Note deleted successfully!',
  })

  return newNotes
}
