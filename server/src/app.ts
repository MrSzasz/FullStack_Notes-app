import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes/notes.routes'

const app = express()

// Middlewares

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(express.urlencoded({ extended: true }))

// Routes

// ===== NOTES =====
app.use('/api/notes', notesRoutes)

export default app
