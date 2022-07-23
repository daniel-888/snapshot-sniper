const ENVIRONMENT = "production";
const SERVER_URL = "https://cmbot-3dboogles-server-tomas.herokuapp.com";
const MULTI_MINT_COUNT = 20;
const LOAD_COUNT = 20;
const LAMPORT = 1000000000;

const UPDATEAUTHORITY_ADDRESS = "6JhtEWtTzxKnRgkR6RhgRbLB43CvRQBcWC1Tuexe3Nwk";
const ALLOWED_NFT_NAME = "VAMB";
const CORS_PROXY_API = `https://angle.boogle-cors.workers.dev?u=`;
const CORS_BUY_PROXY = `https://me-cli.boogle-cors.workers.dev/?u=`;
const MAGICEDEN_API = {
  POPULAR_COLLECTION:
    "https://api-mainnet.magiceden.io/popular_collections?timeRange=1d&edge_cache=true",
  NEW_COLLECTION: `https://api-mainnet.magiceden.io/new_collections`,
  ALL_COLLECTION: `https://api-mainnet.magiceden.io/all_collections_with_escrow_data`,
  COLLECTION: `https://api-mainnet.magiceden.io/collections/`,
  COLLECTION_DETAIL: `https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/`,
  LISTED_NFTS: `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=`,
  COLLECTION_HOLDER_STATUS: `https://api-mainnet.magiceden.io/rpc/getCollectionHolderStats/`,
  ITEMDETAIL: `https://api-mainnet.magiceden.io/rpc/getGlobalActivitiesByQuery?q=`,
  BUY_V2: `https://api-mainnet.magiceden.dev/v2/instructions/buy_now?`,
  CONVERT_IMAGE_150x150: `https://img-cdn.magiceden.dev/rs:fill:150:150:0:0/plain/`,
  CONVERT_IMAGE_70x70: `https://img-cdn.magiceden.dev/rs:fill:70:70:0:0/plain/`,
  CONVERT_IMAGE_40x40: `https://img-cdn.magiceden.dev/rs:fill:40:40:0:0/plain/`,
};
const RELICS_API = {
  STAT: `https://app.relics.ai/api4/stats`,
  PROGRAM: `https://ssc-dao.genesysgo.net/`,
};
const DEFAULT_RPC_API = `https://phantasia.genesysgo.net`;
const CUSTOM_RPC_URL = {
  genesys: `https://phantasia.genesysgo.net`,
  metaplex: `https://api.metaplex.solana.com`,
};
const CUSTOM_RPC_KEY = {
  RPC: `vamb-rpcurl-mode`,
  URL: `vamb-rpcurl-url`,
  CUSTOM: `vamp-rpcurl-custom-url`,
};

export {
  CORS_PROXY_API,
  RELICS_API,
  MAGICEDEN_API,
  ENVIRONMENT,
  SERVER_URL,
  MULTI_MINT_COUNT,
  UPDATEAUTHORITY_ADDRESS,
  ALLOWED_NFT_NAME,
  LAMPORT,
  LOAD_COUNT,
  CUSTOM_RPC_KEY,
  DEFAULT_RPC_API,
  CUSTOM_RPC_URL,
  CORS_BUY_PROXY,
};
