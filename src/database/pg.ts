import { Pool } from 'pg';

export const pool = new Pool({
  user: 'chimera',
  host: 'localhost',
  database: 'exercise_tracker',
  password: '',
  port: 5432
})
