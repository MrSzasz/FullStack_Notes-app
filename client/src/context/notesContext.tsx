'use client'

import type { notesType } from '@/types/notes'

import { createContext, useEffect, useState } from 'react'

import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from '@/services/handleNoteData'

interface NotesContextType {
  notes: notesType[] | []
  handleDeleteNote?: (id: string) => Promise<void>
  handleEditNote?: (note: notesType) => Promise<void>
  handleAddNote?: (note: notesType | Omit<notesType, 'id'>) => Promise<void>
  isLoading: boolean
  isError: null | string
}

export const notesContext = createContext<NotesContextType>({
  notes: [],
  isLoading: true,
  isError: null,
})

const NotesProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [notes, setNotes] = useState<notesType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<null | string>(null)

  const handleAddNote = async (note: Omit<notesType, 'id'>): Promise<void> => {
    const createdNote = await createNote(
      note,
      `${process.env.DB_BASE_URL}/api/notes`,
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
    )

    if (notesWithoutDeleted !== undefined) {
      setNotes(notesWithoutDeleted)
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        const data = await getNotes(`${process.env.DB_BASE_URL}/api/notes`)
        setNotes(data)
      } catch (err) {
        console.error(err)
        setIsError('Error occurred when fetching notes')
      }
      setIsLoading(false)
    })()
  }, [])

  return (
    <notesContext.Provider
      value={{
        notes,
        isLoading,
        isError,
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
