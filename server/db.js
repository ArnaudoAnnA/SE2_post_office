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
const dayjs = require('dayjs');
const config = require('./config');

const connection = mysql.createConnection(config.db);

 
module.exports.get_client_from_queues= (ClientNumber) =>
{
  const query = 'SELECT * FROM `queues` WHERE `ClientNumber` = ?';
  return new Promise((resolve, reject) =>
  {
    connection.query(query, [ClientNumber], (err, result) =>
    {
      if (err) {return reject(err);}

      console.log(result);

      if (!result || result.length != 1) {return reject("Invalid clientNumber");}

      resolve(result[0]);
    });
  });
}

module.exports.remove_client_from_queues = (ClientNumber) =>
{
  const query = 'DELETE FROM `queues` WHERE `ClientNumber` = ?';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ClientNumber], (err, result) =>
    {
      if (err) { return reject(err);}

      resolve(result);
    });
  });
}



//INSERT INTO `statistics` (`ID`, `CounterID`, `ServiceID`, `date`) VALUES
module.exports.add_client_to_statistics = (row) =>
{
  let date = dayjs().format('YYYY-MM-DD');
  console.log(row);

  const query = 'INSERT INTO `statistics` (`CounterID`, `ServiceID`, `date`) '+
                'VALUES (?, ?, ?)';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [row.CounterID, row.ServiceID, date ], (err, result) => 
    {
      if (err) {reject(err);}

      resolve(result);
    });
  });
}

// returns the list of services managed by the counter
module.exports.get_counter_services = (CounterID) =>
{
  const query = 'SELECT `ServiceID` FROM `configuration` '+
              'WHERE `CounterID` = ? ';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [CounterID], (err, result) =>
    {
      console.log(result);
      if (err) reject(err);
      if (!result || result.length <1) reject("Invalid CounterID");
      resolve(result);
    })
  })
}

