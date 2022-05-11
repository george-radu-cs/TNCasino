// we already have the nft_metadata.json files with the metadata for each token
// we are just missing the svg files uri for each token, so we add it here after
// we upload separated the svg files to the ipfs
import { readFileSync, writeFile } from "fs";

const IPFS_CID = "QmXsMdRGr7jMyTDkcKZFiKfqcceAx9X2so8KGLPVVNP9iA";
const MAX_TOKENS = 2;

for (let i = 0; i < MAX_TOKENS; i++) {
  const data = readFileSync(`./TNCasinoMetadataTemp/${i}`, "utf8");
  const metadata = data.replace("REPLACE_IPFS_CID", IPFS_CID);
  writeFile(`./TNCasinoMetadata/${i}`, metadata, "utf-8", () => {});
}
