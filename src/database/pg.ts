import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  user: `${process.env.DB_USERNAME}`,
  host: 'localhost',
  database: 'exercise_tracker',
  password: `${process.env.DB_PASSWORD}`,
  port: 5432
})
