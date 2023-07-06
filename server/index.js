const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// Calculated using the example.js script with the current modified list.
const MERKLE_ROOT = '06918b2c845010c0b4deb24e5fa06e58f86db70d9372b52830d82aea53d48f2f';

app.post('/gift', (req, res) => {
  const body = req.body;

  const proof = body.proof
  const name = body.name

  // Storing only the MERKLE_ROOT and receiving name and proof from the client, we can verify if the name is on the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
