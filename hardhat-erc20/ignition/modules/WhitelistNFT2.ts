// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFT_NAME = "WhitelistNFT2";
const NFT_SYMBOL = "WHITELIST-NFT-2";
const REVEALED_BASE_URI =
  "https://raw.githubusercontent.com/linnefromice/sandbox-contracts/refs/heads/main/hardhat-erc20/resources/metadata/";
const HIDDEN_URI =
  "https://raw.githubusercontent.com/linnefromice/sandbox-contracts/refs/heads/main/hardhat-erc20/resources/metadata/hidden.json";

const WhitelistNFT2Module = buildModule("WhitelistNFT2Module", (m) => {
  const contract = m.contract(
    "WhitelistNFT2",
    [NFT_NAME, NFT_SYMBOL, REVEALED_BASE_URI, HIDDEN_URI],
    {}
  );

  return { contract };
});

export default WhitelistNFT2Module;
