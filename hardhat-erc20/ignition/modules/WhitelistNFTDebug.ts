// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WhitelistNFTDebugModule = buildModule("WhitelistNFTDebugModule", (m) => {
  const contract = m.contract("WhitelistNFTDebug", [], {});

  return { contract };
});

export default WhitelistNFTDebugModule;
