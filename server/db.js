const mysql = require('mysql2/promise');
const config = require('./config');

async function query(connection, sql, params) {
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}