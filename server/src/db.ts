import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool = createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: Number(process.env.MYSQL_DB_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.MYSQL_DB_SSL_CA,
  },
})
