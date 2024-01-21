import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT),
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
})
