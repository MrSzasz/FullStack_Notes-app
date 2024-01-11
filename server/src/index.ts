import app from './app'
import 'dotenv/config'

// Port

const PORT = process.env.PORT

// Server Init

app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.ENV_BASE_URL}${process.env.PORT}`,
  )
})
