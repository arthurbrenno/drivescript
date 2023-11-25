const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  connectionLimit: process.env.CONNECTION_LIMIT,
});

module.exports = pool;
