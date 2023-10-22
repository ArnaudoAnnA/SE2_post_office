/*const mysql = require('mysql2/promise');
const config = require('./config');

async function query(connection, sql, params) {
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}*/


const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  //password: 'root', 
  database: 'db_se2_2023_team3' 
});


connection.connect((err) => {
  if (err) {
    console.error('Error during the connection!!:', err);
    return;
  }
  console.log('Connected!!.');

  
  connection.query('SELECT * FROM service WHERE ServiceID=1', (error, results, fields) => {
    if (error) {
      console.error('Error in query:', error);
      return;
    }
    console.log('Results:', results);

 
    connection.end();
  });
});
