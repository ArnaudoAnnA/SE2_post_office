"use strict" ;

const express = require("express");
const app = express();
const config = require("./config");

app.listen(config.db.port, () => {
    console.log(`Server app listening at ${config.db.host}:${config.db.port}`);
  });

