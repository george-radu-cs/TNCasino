# NFT Agent for TNCasino

It's scope is to generate the nfts and upload them to the ipfs.

Maybe in the future will contain the logic for the casino.

## Using the agent

> create the whitelist

```shell
node whitelist_manager.js
```

> generate the nft art and partial metadata

```shell
node generate_nft_art_partial_metadata.js
```

> upload the svgs to the IPFS and get the CID for the folder which will be the used in the program generate_nft_metadata.js

```shell
cd TNCasinoSVG && ipfs add -wr *
```

> finish the metadata

```shell
node generate_nft_metadata.js
```

> upload the nft json metadata to the ipfs and obtain the CID for the directory and will be the baseURI for our nft collection

```shell
cd TNCasinoMetadata && ipfs add -wr *
```

> start the ipfs daemon

```shell
ipfs daemon
```
