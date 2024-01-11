import { Router } from 'express'
import notesController from '../../controllers/notes/notesControllers'

const notesRoutes = Router()

notesRoutes.get('/', notesController.GET_getAllNotes)
notesRoutes.post('/', notesController.POST_createNote)
notesRoutes.put('/', notesController.PUT_updateNote)
notesRoutes.delete('/', notesController.DELETE_deleteNote)

export default notesRoutes
