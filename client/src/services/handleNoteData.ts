import { toast } from '@/components/ui/use-toast'
import type { notesType } from '@/types/notes'

/**
 * Asynchronous function to retrieve notes based on user authentication status.
 *
 * @param {string} url - The URL to fetch the notes from.
 * @param {boolean} isLoggedIn - Indicates if the user is logged in.
 * @param {string} userId - The ID of the user.
 * @return {Promise<notesType[]>} A promise that resolves to an array of notes.
 */
export const getNotes = async (
  url: string,
  isLoggedIn: boolean,
  userId: string,
): Promise<notesType[]> => {
  if (!isLoggedIn) {
    const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

    if (notesInLocalStorage === '[]') {
      localStorage.setItem('notes', JSON.stringify([]))
      return []
    }

    return JSON.parse(notesInLocalStorage)
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': String(process.env.URL_ORIGIN_FOR_CORS),
        'x-auth-id': `Bearer ${userId}`,
      },
    })
    const data = await response.json()

    return data.notes
  } catch (error) {
    console.error('Error retrieving notes:', error)
    throw error
  }
}

/**
 * Creates a new note and stores it in local storage if the user is not logged in.
 * If the user is logged in, it sends a POST request to the specified URL to create
 * the note. It then displays a toast message based on the success or failure of
 * the operation.
 *
 * @param {Omit<notesType, 'id'>} noteForBody - The note object without the 'id' field
 * @param {string} url - The URL where the note will be sent if the user is logged in
 * @param {boolean} isLoggedIn - Indicates whether the user is logged in
 * @param {string} userId - The user ID used for authentication
 * @return {Promise<notesType | undefined>} The newly created note or undefined if
 * the user is logged in and an error occurs during the POST request
 */
export const createNote = async (
  noteForBody: Omit<notesType, 'id'>,
  url: string,
  isLoggedIn: boolean,
  userId: string,
): Promise<notesType | undefined> => {
  if (!isLoggedIn) {
    const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

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
  } else {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': String(
          //   process.env.URL_ORIGIN_FOR_CORS,
          // ),
          'x-auth-id': `Bearer ${userId}`,
        },
        credentials: 'include',
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
}

/**
 * Edit a note and update it in the notes list.
 *
 * @param {notesType[]} currentNotes - the current list of notes
 * @param {notesType} noteForBody - the note to be updated
 * @param {string} url - the URL for the API endpoint
 * @param {boolean} isLoggedIn - indicates if the user is logged in
 * @param {string} userId - the ID of the logged-in user
 * @return {Promise<notesType[] | undefined>} the updated list of notes, or undefined
 */
export const editNote = async (
  currentNotes: notesType[],
  noteForBody: notesType,
  url: string,
  isLoggedIn: boolean,
  userId: string,
): Promise<notesType[] | undefined> => {
  if (!isLoggedIn) {
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
  } else {
    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': String(
          //   process.env.URL_ORIGIN_FOR_CORS,
          // ),
          'x-auth-id': `Bearer ${userId}`,
        },
        credentials: 'include',
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
}

/**
 * Deletes a note from the current notes array or from the server.
 *
 * @param {notesType[]} currentNotes - array of current notes
 * @param {string} id - id of the note to be deleted
 * @param {string} url - the url for the delete request
 * @param {boolean} isLoggedIn - indicates if the user is logged in
 * @param {string} userId - the id of the user
 * @return {Promise<notesType[] | undefined>} the updated notes array or undefined
 */
export const deleteNote = async (
  currentNotes: notesType[],
  id: string,
  url: string,
  isLoggedIn: boolean,
  userId: string,
): Promise<notesType[] | undefined> => {
  if (!isLoggedIn) {
    const notesInLocalStorage = localStorage.getItem('notes') ?? '[]'

    const notes = JSON.parse(notesInLocalStorage)

    const newNotes = notes.filter((note: notesType) => note.id !== id)

    localStorage.setItem('notes', JSON.stringify(newNotes))

    toast({
      duration: 2000,
      description: 'Note deleted successfully!',
    })

    return newNotes
  } else {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': String(
          //   process.env.URL_ORIGIN_FOR_CORS,
          // ),
          'x-auth-id': `Bearer ${userId}`,
        },
        credentials: 'include',
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
}
