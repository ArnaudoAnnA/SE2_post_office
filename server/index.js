"use strict";

const express = require("express");
const app = express();
const config = require("./config");
const morgan = require('morgan'); //it enables to log all the requestes whose reached the server (debugging purpose)
const cors = require('cors');
app.use(express.json());
app.use(express.static('images'))

const db = require('./db');


/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
app.use(cors());

app.use(morgan('dev'));

/*
* POST api/queues
* Add a client to the queue
*/
app.post('/API/queues', async (req, res) => {
  db.addClientQueue(req.body.service)
    .then(() => res.end())
    .catch(() => res.status(503).json({errors: "Database error during client insertion"}));
});


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
      console.log(`ERROR in request: clientNumber not found (${err})`);
    });
  if (error) return res.status(404).end();


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

  return res.status(200).end();
});

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

app.get('/API/next_client', async (req, res) => {
  //TO DO: authentication of the client, so that the clientNumber in the body won't be further necessary

  //Validate counterID
  if (!Number.isInteger(req.body.CounterID)) {
    return res.status(400).end();
  }

  let error = false;

  //look for the services managed by this counter
  let services = await db.get_counter_services(req.body.CounterID)
    .catch(err => {
      error = true;
      console.log(`ERROR while looking for CounterID ${req.body.CounterID} in configuration table (${err})`);
    });
  if (error) { return res.status(404).end(); }

  //if the number of services is greather than one, decide which to serve by looking for the one with the longest queue
  let serviceID = services[0];
  if (services.lenght > 1) {
    //algorithm for finding the service with the max queue length
    let max_len = -1;
    services.forEach(async (sID) => {
      let curr_len = await db.get_service_queue_len(sID)
        .catch(err => {
          error = true;
          console.log(`ERROR while getting queues' lenght (${err})`);
        });
      if (!error && curr_len > max_len) {
        max_len = curr_len;
        serviceID = sID;
      }
    });
  }
  if (error) { return res.status(500).end(); }

  //get the first client from the service's queue
  let ClientNumber = await db.get_first_client_from_queue(ServiceID)
    .catch(err => {
      error = true;
      console.log(`ERROR while fetching the first client of the queue related to service ${ServiceID} (${err})`);
    });

  await db.assign_client_to_counter(ClientNumber, req.body.CounterID)
    .catch(err => {
      error = true;
      console.log(`ERROR when writing on table queues with the aim of assigning ClientNumber ${ClientNumber} to CounterID ${CounterID} (${err})`);
    });
  if (error) { return res.status(500).end(); }

  return res.status(200).json({ ClientNumber: ClientNumber });
})


app.listen(config.web_server.port, async () => {
  console.log(`Server app listening at ${config.web_server.host}:${config.web_server.port}`);
});
