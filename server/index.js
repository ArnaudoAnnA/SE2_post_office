"use strict" ;

const express = require("express");
const app = express();
const config = require("./config");
const mysql = require('mysql2/promise');

let connection;

app.listen(config.web_server.port, async () => {
    connection = await mysql.createConnection(config.db);
    console.log(`Server app listening at ${config.web_server.host}:${config.web_server.port}`);
  });

