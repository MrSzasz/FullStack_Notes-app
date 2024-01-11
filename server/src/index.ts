import app from './app'
import 'dotenv/config'

// Port

const PORT = process.env.PORT

// Server Init

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`)
})
