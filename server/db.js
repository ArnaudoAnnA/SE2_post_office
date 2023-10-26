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
  const query = 'INSERT INTO `queues` (`ServiceID`) VALUES (?)';
  return new Promise((resolve, reject) => {
    connection.execute(query, [service], (err, result) => {
      if (err) { console.log("errore qui" ); return reject(err); }

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
    if (row.CounterID == null){reject("BADREQUEST");}
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
      console.log(`Services managed by conuter ${CounterID}: `);
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
  const query = 'SELECT COUNT(*) AS len FROM `queues` WHERE `ServiceID` = ? AND CounterID IS NULL';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ServiceID], (err, result) =>
    {
      console.log(`Len of service's ${ServiceID} queue: ${result[0].len}`);
      if (err) reject(err);
      if (!result || result.length <1) reject("Invalid ServiceID"); //the specified service queue may be empty
      resolve(result[0].len);
    })
  })
}

//resolve(ClientNumber) in case of success
//reject(message) in case of failure
//From the rows with the specified service ID, we need to fetch the one with the lowest ClientNumber
module.exports.get_first_client_from_queue  = (ServiceID) =>
{
  const query = 'SELECT `ClientNumber` FROM `queues` WHERE `ServiceID` = ? AND `CounterID` IS NULL ORDER BY `ClientNumber` LIMIT 1' ;
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ServiceID], (err, result) =>
    {
      console.log(result);
      if (err) reject(err);
      if (!result) reject("Invalid ServiceID"); //the specified service queue may be empty
      resolve(result[0].ClientNumber);
    })
  })
}

module.exports.get_client_assigned_to_counter = (CounterID) =>
{
  const query = 'SELECT `ClientNumber` FROM `queues` WHERE `CounterID` = ?' ;
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [CounterID], (err, result) =>
    {
      console.log(result.length);
      if (err) reject(err);
      else if (!result || result.length === 0) reject(`No Clients associated with CounterID ${CounterID}`);
      else if (result.length > 1) reject(`There's more than one client associated with CounterID ${CounterID}`);
      else resolve(result[0].ClientNumber);
    })
  })
}

module.exports.get_client_and_service_assigned_to_counter = (CounterID) =>
{
  const query = 'SELECT `ClientNumber`, `ServiceID` FROM `queues` WHERE `CounterID` = ?' ;
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [CounterID], (err, result) =>
    {
      console.log(result.length);
      if (err) reject(err);
      else if (!result || result.length === 0) reject(`No Clients associated with CounterID ${CounterID}`);
      else if (result.length > 1) reject(`There's more than one client associated with CounterID ${CounterID}`);
      else resolve(result[0]);
    })
  })
}

//resolve(void) in case of success 
//reject(message) in case of failure 
//we need to update the CounterID column of the row with the specified ClientNumber
module.exports.assign_client_to_counter = (ClientNumber, CounterID) =>
{
  const query = 'UPDATE `queues` SET `CounterID` = ? WHERE `ClientNumber` = ?';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [CounterID, ClientNumber], (err, result) =>
    {
      if (err) reject(err);
      if (!result || result.affectedRows != 1) reject("No result or wrong number of affected rows");
      resolve();
    })
  })
}


// Get assigned clients
module.exports.get_assigned_clients = () =>
{
  const query = 'SELECT t.CounterID counterID, t.ClientNumber clientNumber, s.Description serviceType ' +
                'FROM queues t ' + 
                'JOIN service s on t.ServiceID = s.ServiceID ' + 
                'WHERE t.CounterID is not null;';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, (err, result) =>
    {
      if (err) {reject(err); return}
      console.log('Refreshing assigned clients');
      const assignedClients = result.map(row => ({
        clientNumber: row.clientNumber,
        serviceType: row.serviceType,
        counterID: row.counterID
      }));
      resolve(assignedClients);
    });
  });
}

//Get the service name from the serviceID
module.exports.get_service_name_from_service_id = (ServiceID) =>
{
  const query = 'SELECT s.Description ServiceName ' +
                'FROM service s ' + 
                'WHERE s.ServiceID = ?;';
  return new Promise((resolve, reject) =>
  {
    connection.execute(query, [ServiceID], (err, result) =>
    {
      if (err) reject(err);
      else if (!result || result.length === 0) reject(`Service ${ServiceID} does not exist`);
      else if (result.length > 1) reject(`There's more than one service name associated with service ${ServiceID}`);
      
      resolve(result[0].ServiceName);
    })
  })
}
