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

// Add a client to the queue of the specified service
module.exports.addClientQueue = (service) => {
  const query = 'INSERT INTO `queues` (`ServiceID`) SELECT `serviceID` FROM `service` WHERE `description` = ? VALUES (?)';
  return new Promise((resolve, reject) => {
    connection.execute(query, [service], (err, result) => {
      if (err) { return reject(err); }

      resolve(result);
    });
  });
}

 
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


//resolve(int) in case of success
//reject(message) in case of failure
//we need to count the number of rows in queues that contain the specified ServiceID
module.exports.get_service_queue_len = (ServiceID) =>
{
  const query = 'SELECT count("x") FROM `queues` WHERE `ServiceID` = ?';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ServiceID], (err, result) =>
    {
      console.log(result);
      if (err) reject(err);
      if (!result || result.length <1) reject("Invalid ServiceID or empty queue"); //the specified service queue may be empty
      resolve(result);
    })
  })
}

//resolve(ClientNumber) in case of success
//reject(message) in case of failure
//From the rows with the specified service ID, we need to fetch the one with the lowest ClientNumber
module.exports.get_first_client_from_queue  = (ServiceID) =>
{
  const query = 'SELECT `ClientNumber` FROM `queues` WHERE `ServiceID` = ? ORDER BY ´ClientNumber´ LIMIT 1' ;
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ServiceID], (err, result) =>
    {
      console.log(result);
      if (err) reject(err);
      if (!result || result.length <1) reject("Invalid ServiceID or empty queue"); //the specified service queue may be empty
      resolve(result);
    })
  })
}

//resolve(void) in case of success 
//reject(message) in case of failure 
//we need to update the CounterID column of the row with the specified ClientNumber
module.exports.assign_client_to_counter = (ClientNumber, CounterID) =>
{
  const query = 'UPDATE `queues` SET ´CounterID´ = ? WHERE ´ClientNumber´ = ?';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [CounterID, ClientNumber], (err, result) =>
    {
      console.log(result);
      if (err) reject(err);
      resolve();
    })
  })
}


// Get assigned clients
module.exports.get_assigned_clients = () =>
{
  const query = 'SELECT t.CounterID counterID, t.ClientNumber clientNumber, s.Description serviceType '
                'FROM queues t ' + 
                'JOIN service s on t.ServiceID = s.ServiceID ' + 
                'WHERE t.CounterID is not null;';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, (err, result) =>
    {
      if (err) {reject(err); return}
      console.log(result)
      const assignedClients = result.map(row => ({
        clientNumber: row.clientNumber,
        serviceType: row.serviceType,
        counterID: row.counterID
      }));
      resolve(assignedClients);
    });
  });
}
