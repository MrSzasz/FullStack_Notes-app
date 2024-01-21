import { toast } from '@/components/ui/use-toast'
import type { notesType } from '@/types/notes'

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
        'Access-Control-Allow-Origin': '*',
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
          'Access-Control-Allow-Origin': '*',
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
          'Access-Control-Allow-Origin': '*',
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
          'Access-Control-Allow-Origin': '*',
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
