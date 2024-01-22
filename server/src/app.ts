import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes/notes.routes'
import 'dotenv/config'

const app = express()

// Middlewares

app.use(express.json())
app.use(
  cors({
    origin: process.env.URL_ORIGIN_FOR_CORS,
    credentials: true,
  }),
)
app.use(express.urlencoded({ extended: true }))

// Routes

// ===== NOTES =====
app.use('/api/notes', notesRoutes)

export default app
