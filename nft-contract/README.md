# TNCasino NFT Contract

An NFT contract for the TNCasino game. Using two examples, first an implementation using the openzeppelin ERC721 (OldTNCasino) will not be mainted anymore and the second one using the ERC721A implementation from chiru-labs/ERC721A will be used. The second one represent an improvement in performance and gas reduction. This contract is not final since we don't have the backend for casino yet and improvements can still be made.

## Hardhat commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Usage

```shell
npx hardhat run scripts/sample-script.js --network rinkeby

npx hardhat verify --contract contracts/TNCasino.sol:TNCasino --network rinkeby <address>
```
