const mysql = require('mysql2/promise');
require('dotenv').config();

async function Main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  });

  exports.query = async (query, values) => {
    const [rows, fields] = await connection.execute(query, values);
    return rows;
  };
}

Main();
