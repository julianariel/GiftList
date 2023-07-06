const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const name = 'Julian Martinez';
const index = niceList.findIndex(n => n === name);

async function main() {

  // Build the tree.
  const tree = new MerkleTree(niceList)

  // Get the proof
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

main();