import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes/notesRoutes'

const app = express()

// Middlewares

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Routes

// ===== ROOT =====
app.get('/', (_req, res) => {
  res.json({ message: 'working' })
})

// ===== NOTES =====
app.use('/api/notes', notesRoutes)

export default app
