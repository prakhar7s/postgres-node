const express = require("express");
const { Client } = require("pg");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connectivity to pg
const client = new Client({
  connectionString: process.env.CONNECTION_STRING,
});
client.connect();

app.get("/", (req, res) => {
  client.query("SELECT NOW();", (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(result.rows[0].now.toString());
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}.`);
});
