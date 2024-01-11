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

  GET_getAllNotes: asyncHandler(async (_req, res, _next): Promise<any> => {
    try {
      const notesFromDB = await getAllNotes()
      return res.json(notesFromDB)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: error })
    }
  }),

  // ==================== POST ====================

  // Create new note

  POST_createNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body: notesType = req.body

      const newNote = {
        id: crypto.randomUUID(),
        title: body.title,
        content: body.content,
      }

      if (!isValid(newNote)) {
        return res
          .status(400)
          .json({ message: "data must contain 'title' and 'content" })
      }

      try {
        const createdNote = await createNote(newNote)

        return res
          .status(200)
          .json({ message: 'Note created successfully', note: createdNote })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
      }
    },
  ),

  // ==================== PUT ====================

  // Update one note

  PUT_updateNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body: notesType = req.body

      if (typeof body.id !== 'string') {
        return res.status(400).json({ message: "'id' must be a string" })
      }

      if (!isValid(body)) {
        return res
          .status(400)
          .json({ message: 'id, title, and content must not be empty' })
      }

      try {
        const updatedNote = await updateNote(body)

        return res.json({
          message: 'note updated successfully',
          note: updatedNote,
        })
      } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error })
      }
    },
  ),

  // ==================== DELETE ====================

  // Delete one note

  DELETE_deleteNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body: { id: string } = req.body

      if (typeof body.id !== 'string') {
        return res.status(400).json({ message: "'id' must be a string" })
      }

      if (body.id === undefined) {
        return res.status(400).json({ message: 'id must not be empty' })
      }

      try {
        const deletedNote = await deleteNote(body.id)
        return res.json({
          message: 'Note deleted successfully',
          note: deletedNote,
        })
      } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error })
      }
    },
  ),
}

export default notesController
