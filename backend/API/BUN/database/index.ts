import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.CONNECTION_LIMIT),
});

export default pool;
