import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import fs from 'fs'

// (1)
import addresses from './addresses.js'

// (2)
const tree = StandardMerkleTree.of(addresses, ["address", "uint256"]);

// (3)
console.log('Merkle Root:', tree.root);

// (4)
fs.writeFileSync("./utils/tree.json", JSON.stringify(tree.dump()));
