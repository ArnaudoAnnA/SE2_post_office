"use strict" ;

const express = require("express");
const app = express();
const config = require("./config");
const morgan = require('morgan'); //it enables to log all the requestes whose reached the server (debugging purpose)
const cors = require('cors');
app.use(express.json());

const db = require('./db');


/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
app.use(cors());

app.use(morgan('dev'));


app.put(`/API/client_served`, async (req, res) =>
{
  //TO DO: authentication of the client 

  //Validate client number
  if (!Number.isInteger(req.body.ClientNumber))
  {
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
  if (error) {return res.status(500).end();}

  //delete the client from the db
  await db.remove_client_from_queues(req.body.ClientNumber)
    .catch(err => {
      error = true;
      console.log(`ERROR while removing the client from the queue  (${err})`);
    });
  if(error) {return res.status(500).end();}

  return res.status(200).end();
});


app.get('/API/next_client', async (req, res) =>
{
  //TO DO: authentication of the client

  //Validate counterID
  if (!Number.isInteger(req.body.CounterID))
  {
    return res.status(400).end();
  }

  let error = false;

  //look for the services managed by this counter
  let services = await db.get_counter_services(req.body.CounterID)
    .catch(err => 
      {
        error = true;
        console.log(`ERROR while looking for CounterID ${req.body.CounterID} in configuration table (${err})`);
      });
  if (error) {return res.status(404).end();}

  //if the number of services is greather than one, decide which to serve by looking for the one with the longest queue
  if (services.lenght > 1) console.log(services);

})


app.listen(config.web_server.port, async () => {
    console.log(`Server app listening at ${config.web_server.host}:${config.web_server.port}`);
  });
