import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes/notesRoutes'

const app = express()

// Middlewares

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Routes

// ===== NOTES =====
app.use('/api/notes', notesRoutes)

export default app
