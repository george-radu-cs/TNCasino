# TNCasino NFT

An NFT contract for the TNCasino game. Using two examples, first an implementation using the openzeppelin ERC721 (OldTNCasino) will not be mainted anymore and the second one using the ERC721A implementation from chiru-labs/ERC721A will be used. The second one represent an improvement in performance and gas reduction. This contract is not final since we don't have the backend for casino yet and improvements can still be made.

## NFT Agent for TNCasino

It's scope is to generate the nfts and upload them to the ipfs.

Maybe in the future will contain the logic for the casino.

## TODO

- [ ] the token should contain additional type of information
- [ ] the metadata for a token should be changed after each spin on the slot, so we need to switch from the ipfs to the local file system in a db
- [ ] create nicer art
- [ ] create api for whitelist
- [ ] create a skelet for the casino logic backend
- [ ] create an ui for the casino
- [ ] add the first slot machine
- [ ] create api to update the metadata for an nft when free spins are used
- [ ] let the token be a casino pass, we can save the amount of coins wined by the user in the metadata, he can have the chance later to sell it with the money, without them or with some free spins left, none or any other combination
