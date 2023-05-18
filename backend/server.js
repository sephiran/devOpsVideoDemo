"use strict";
function run(callback) {
  const express = require("express");
  const cors = require('cors');

  // Constants
  const PORT = process.env.PORT || 4000;
  const HOST = "0.0.0.0";

  // App
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Hello FS2023 DevOps Course!!! Azure Test!");
  });

  app.post("/countdown", (req, res) => {
    const eventDateTime = new Date(req.body.dateTime);
    const currentDateTime = new Date();

    const differenceInMs = eventDateTime.getTime() - currentDateTime.getTime();

    if (differenceInMs < 0) {
      return res.status(400).json({ error: "The event date is in the past." });
    }

    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    res.json({ seconds: differenceInSeconds });
  });

  // start server
  const server = app.listen(PORT, HOST, function () {
    console.log("Server listening on port " + PORT);
    callback();
  });

  server.on("close", function () {
    console.log("closed");
  });

  return server;
}

if (require.main === module) {
  run();
}
exports.run = run;
