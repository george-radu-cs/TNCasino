import {
  nft_metadata,
  nft_probabilities,
  nft_svg_template,
} from "./nft_metadata.js";
import { writeFile } from "fs";

const getIndexTrait = (value, probabilities_interval) => {
  for (let i = probabilities_interval.length - 2; i >= 0; i--) {
    if (probabilities_interval[i] <= value) {
      return i + 1;
    }
  }
  return 0;
};

const generate_nft_metadata = (id) => {
  const metadata = {
    name: `#${id}`,
    description: "TNCasino access token",
    image: `ipfs://REPLACE_IPFS_CID/${id}.svg`,
    attributes: [],
  };
  Object.keys(nft_metadata).forEach((key) => {
    const random = Math.random();
    const value =
      nft_metadata[key][getIndexTrait(random, nft_probabilities[key])];
    metadata.attributes.push({
      trait_type: key,
      value: value,
    });
  });
  return metadata;
};

const get_value_from_nft_attributes = (trait_type, attributes) => {
  return attributes.find((attribute) => attribute.trait_type === trait_type)
    .value;
};

const generate_nft_svg = (nft_metadata) => {
  return nft_svg_template
    .replace("REPLACE_ID", nft_metadata.name)
    .replace(
      "REPLACE_COIN_VALUE",
      get_value_from_nft_attributes("coin_value", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_FREE_SPINS_LEFT",
      get_value_from_nft_attributes("free_spins_left", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_VOLATILITY",
      get_value_from_nft_attributes("volatility", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_MAX_MULTIPLIER",
      get_value_from_nft_attributes("max_multiplier", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_MAX_ALLOWED_BETS",
      get_value_from_nft_attributes("max_allowed_bets", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_BONUS_FEATURE",
      get_value_from_nft_attributes("bonus_feature", nft_metadata.attributes)
    )
    .replace(
      "REPLACE_ALLOWED_ADDITIONAL_GAMES",
      get_value_from_nft_attributes(
        "allowed_additional_games",
        nft_metadata.attributes
      )
    );
};

const generate_nfts_metadata = (nfts_count) => {
  for (let i = 0; i < nfts_count; i++) {
    const nft_metadata = generate_nft_metadata(i);
    const nft_metadata_json = JSON.stringify(nft_metadata);
    const nft_svg = generate_nft_svg(nft_metadata);
    writeFile(`./TNCasinoMetadataTemp/${i}`, nft_metadata_json, "utf-8", () => {});
    writeFile(`./TNCasinoSVG/${i}.svg`, nft_svg, "utf-8", () => {});
  }
};

generate_nfts_metadata(2);
console.log("NFT metadata generated");
