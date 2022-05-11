import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

// hard coded should be changed to be read from a csv or better in a db
const whitelistAddresses = [
  "0x541519cf0943b2Efba75841E73aacD3A4a1752FF",
  "0x09B81aCA4cC68cE2b0152cDE480A71368bf5084d",
  "0x7d01A6729dbbB65DCb185C8159d3ED81Ef579d47",
  "0x3C396Af48d711224D933c72Db7208497CDd1c122",
  "0x2a7a3aa7f0F92D14C57C331A06347ed9409507b8",
];

// should be wrapped inside an init function when starting the agent if the tree
// doesn't exist yet, also we should save the tree
const leafNodes = whitelistAddresses.map(address => keccak256(address));
const merkleTree = new MerkleTree.MerkleTree(leafNodes, keccak256, {sortPairs: true});

// here is a simple example of how to use the tree, should create an api endpoint
// which receives an address to whitelist and returns the merkle hexProof
const rootHash = merkleTree.getRoot();
console.log("rootHash", "0x" + rootHash.toString("hex"));

console.log("Merkle tree")
console.log(merkleTree.toString());

const claimingAddress = "0x541519cf0943b2Efba75841E73aacD3A4a1752FF";
const hexProof = merkleTree.getHexProof(keccak256(claimingAddress));

console.log("claiming address hash", keccak256(claimingAddress).toString('hex'));
console.log("hex proof", hexProof);