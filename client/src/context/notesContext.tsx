'use client'

import type { notesType } from '@/types/notes'

import { createContext, useEffect, useState } from 'react'

import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from '@/services/handleNoteData'
import { useUser } from '@auth0/nextjs-auth0/client'
import type { UserProfile } from '@auth0/nextjs-auth0/client'

interface NotesContextType {
  user: null | undefined | UserProfile
  notes: notesType[] | []
  handleDeleteNote?: (id: string) => Promise<void>
  handleEditNote?: (note: notesType) => Promise<void>
  handleAddNote?: (note: notesType | Omit<notesType, 'id'>) => Promise<void>
  isLoading: boolean
  isError: Error | null | string | undefined
}

export const notesContext = createContext<NotesContextType>({
  user: null,
  notes: [],
  isLoading: true,
  isError: null,
  handleDeleteNote: async () => {},
  handleEditNote: async () => {},
  handleAddNote: async () => {},
})

const NotesProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const { user, error, isLoading } = useUser()

  const [notes, setNotes] = useState<notesType[]>([])

  const handleAddNote = async (note: Omit<notesType, 'id'>): Promise<void> => {
    const createdNote = await createNote(
      note,
      `${process.env.DB_BASE_URL}/api/notes`,
      user?.sub,
    )

    if (createdNote !== undefined) {
      const newNotes = [...notes, createdNote]

      setNotes(newNotes)
    }
  }

  const handleEditNote = async (note: notesType): Promise<void> => {
    const newNotesArray = await editNote(
      notes,
      note,
      `${process.env.DB_BASE_URL}/api/notes`,
      user?.sub,
    )

    if (newNotesArray !== undefined) {
      setNotes(newNotesArray)
    }
  }

  const handleDeleteNote = async (id: string): Promise<void> => {
    const notesWithoutDeleted = await deleteNote(
      notes,
      id,
      `${process.env.DB_BASE_URL}/api/notes`,
      user?.sub,
    )

    if (notesWithoutDeleted !== undefined) {
      setNotes(notesWithoutDeleted)
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        const data = await getNotes(
          `${process.env.DB_BASE_URL}/api/notes`,
          user?.sub,
        )
        setNotes(data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [isLoading])

  return (
    <notesContext.Provider
      value={{
        user,
        notes,
        isLoading,
        isError: error,
        handleDeleteNote,
        handleEditNote,
        handleAddNote,
      }}
    >
      {children}
    </notesContext.Provider>
  )
}

export default NotesProvider
