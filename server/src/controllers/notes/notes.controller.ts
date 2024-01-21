import type { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '../../../services/handleNotes'
import type { notesType } from '../../../types/dict'
import { isValid } from '../../../services/functions'

const notesController = {
  // ==================== GET ====================

  // Get all notes

  GET_getAllNotes: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const authToken = req.headers['x-auth-id']
      const userId = (authToken as string)?.split(' ')[1]

      if (!isValid({ userId })) {
        return res.status(400).json({ message: 'Invalid user data' })
      }

      try {
        const notesFromDB = await getAllNotes(userId)
        return res.json({ notes: notesFromDB })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err })
      }
    },
  ),

  // ==================== POST ====================

  // Create new note

  POST_createNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const authToken = req.headers['x-auth-id']
      const userId = (authToken as string)?.split(' ')[1]

      const bodyWithNoteData: notesType = req.body

      if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ message: 'Invalid user' })
      }

      if (!isValid({ ...bodyWithNoteData })) {
        return res
          .status(400)
          .json({ message: "Note must contain 'title' and 'content'" })
      }

      const newNote = {
        id: crypto.randomUUID(),
        title: bodyWithNoteData.title,
        content: bodyWithNoteData.content,
      }

      try {
        const createdNote = await createNote(newNote, userId)

        return res
          .status(200)
          .json({ message: 'Note created successfully', note: createdNote })
      } catch (err) {
        console.error(err)
        return res.status(400).json({ message: err })
      }
    },
  ),

  // ==================== PUT ====================

  // Update one note

  PUT_updateNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const authToken = req.headers['x-auth-id']
      const userId = (authToken as string)?.split(' ')[1]
      const bodyWithNoteDataToUpdate: notesType = req.body

      if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ message: 'Invalid user' })
      }

      if (!isValid(bodyWithNoteDataToUpdate)) {
        return res.status(400).json({
          message:
            'Invalid data. Note must contain "id", "title", and "content"',
        })
      }

      try {
        const updatedNote = await updateNote(bodyWithNoteDataToUpdate, userId)

        return res.json({
          message: 'Note updated successfully',
          note: updatedNote,
        })
      } catch (err) {
        console.error(err)
        return res.status(404).json({ message: err })
      }
    },
  ),

  // ==================== DELETE ====================

  // Delete one note

  DELETE_deleteNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const authToken = req.headers['x-auth-id']
      const userId = (authToken as string)?.split(' ')[1]
      const { id }: { id: string } = req.body

      if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ message: 'Invalid user' })
      }

      if (!isValid({ id })) {
        return res.status(400).json({ message: 'Invalid note data' })
      }

      try {
        const deletedNote = await deleteNote(id, userId)

        return res.json({
          message: 'Note deleted successfully',
          note: deletedNote,
        })
      } catch (err) {
        console.error(err)
        return res.status(404).json({ message: err })
      }
    },
  ),
}

export default notesController
