import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool = createPool({
  uri: process.env.MYSQL_ADDON_URI,
})
