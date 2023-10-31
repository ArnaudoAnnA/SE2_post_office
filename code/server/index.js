"use strict";

/*** Importing modules ***/
const express = require("express");
const morgan = require('morgan'); //it enables to log all the requestes whose reached the server (debugging purpose)
const cors = require('cors');
const config = require("./config");
const db = require('./db');

/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('images'))

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
app.use(cors());





/*
* POST api/queues
* Add a client to the queue
*/
app.post('/API/queues', async (req, res) => {
  db.addClientQueue(req.body.service)
    .then(() => res.status(200).end())
    .catch(() => res.status(503).json({errors: "Database error during client insertion"}));
});

//This API move a client that has been served from the queue to the statistic table
app.put(`/API/client_served`, async (req, res) => {
  //TO DO: authentication of the client, so that the CounterID in the body won't be further necessary 

  //Validate client number
  if (!Number.isInteger(req.body.ClientNumber)) {
    return res.status(400).end();
  }

  let error = false;
  //Look for client number in DB
  let client = await db.get_client_from_queues(req.body.ClientNumber)
    .catch(err => {
      error = true;
      console.log(`ERROR in request: clientNumber ${req.body.ClientNumber} not found (${err})`);
    });
  if (error) return res.status(404).end();

  if (!client.CounterID)
  {
    console.log(`ERROR trying to mark as select the client ${client.ClientNumber} who was not assigned to any counter`);
    return res.status(400).end();
  } 

  //add the client to the statistics table
  await db.add_client_to_statistics(client)
    .catch(err => {
      error = true;
      console.log(`ERROR in writing in statistics table (${err})`);
    });
  if (error) { return res.status(500).end(); }

  //delete the client from the db
  await db.remove_client_from_queues(req.body.ClientNumber)
    .catch(err => {
      error = true;
      console.log(`ERROR while removing the client from the queue  (${err})`);
    });
  if (error) { return res.status(500).end(); }

  return res.status(200).json({});
});

//This API call from the queue the client that must be served
app.get(`/API/next_client/:counterID`, async (req, res) => {
  //TO DO: authentication of the client, so that the clientNumber in the body won't be further necessary
  
  //Validate counterID
  /*if (!Number.isInteger(req.params.counterID)) {
    return res.status(400).end();
  }*/

  let error = true;
  await db.get_client_assigned_to_counter(req.params.counterID)
    .catch(err => {if (err.startsWith("No Clients associated with CounterID")) {error = false;} });
  if (error)
  {
    console.log(`Counter ${req.params.counterID} already ascociated to a client`);
    return res.status(400).end();
  }

  //look for the services managed by this counter
  let services = await db.get_counter_services(req.params.counterID)
    .catch(err => {
      error = true;
      console.log(`ERROR while looking for CounterID ${req.params.counterID} in configuration table (${err})`);
    });
  if (error) { return res.status(404).end(); }

  //algorithm for finding the service with the max queue length
  let ServiceID;
  let max_len = -1;
  for (let service of services)
  {
    let curr_len = await db.get_service_queue_len(service.ServiceID)
      .catch(err => {
        error = true;
        console.log(`ERROR while getting queue lenght of service ${service.ServiceID} (${err})`);
      });
    if (!error && curr_len > max_len) {
      max_len = curr_len;
      ServiceID = service.ServiceID;
     }
  }
  
  console.log(`max service's queue len: ${max_len} (service ${ServiceID})`);
  if (error) { return res.status(500).end(); }
  if (max_len <= 0) { return res.json({ ClientNumber: -1, ServiceName: "" }); }

  //get the first client from the service's queue
  let ClientNumber = await db.get_first_client_from_queue(ServiceID)
    .catch(err => {
      error = true;
      console.log(`ERROR while fetching the first client of the queue related to service ${ServiceID} (${err})`);
    });

  await db.assign_client_to_counter(ClientNumber, req.params.counterID)
    .catch(err => {
      error = true;
      console.log(`ERROR when writing on table queues with the aim of assigning ClientNumber ${ClientNumber} to CounterID ${req.params.counterID} (${err})`);
    });
  if (error) { return res.status(500).end(); }

  let ServiceName = await db.get_service_name_from_service_id(ServiceID)
    .catch(err => {
      error = true;
      console.log(`ERROR while fetching the service name of the service number ${ServiceID} (${err})`);
    });
  if (error) { return res.status(500).end(); }

  return res.status(200).json({ ClientNumber: ClientNumber, ServiceName: ServiceName });
})

app.get(`/API/get_assigned_clients`, async (req, res) => {
  await db.get_assigned_clients()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(`ERROR in request: ${err}`);
      return res.status(500).end();
    });
});

//This API find the client (and relative Service name) assigned to a counter
app.get(`/API/get_client_and_service_assigned_to_counter/:counterID`, async (req, res) => {
  //TO DO: authentication of the client, so that the clientNumber in the body won't be further necessary
  
  //Validate counterID
  /*if (!Number.isInteger(req.params.counterID)) {
    return res.status(400).end();
  }*/

  let flag = 1;
  let user = await db.get_client_and_service_assigned_to_counter(req.params.counterID)
    .catch(err => {
      if (err.startsWith("No Clients associated with CounterID")) {
        flag = 0;
      }
    });
  
  if (flag) {
    let ServiceName = await db.get_service_name_from_service_id(user.ServiceID)
    .catch(err => {
      console.log(`ERROR while fetching the service name of the service number ${ServiceID} (${err})`);
      return res.status(500).end();
    });

    return res.status(200).json({ ClientNumber: user.ClientNumber, ServiceName: ServiceName});
  } else {
    return res.status(200).json({ ClientNumber: -1, ServiceName: '' });
  }
});

app.listen(config.web_server.port, async () => {
  console.log(`Server app listening at ${config.web_server.host}:${config.web_server.port}`);
});