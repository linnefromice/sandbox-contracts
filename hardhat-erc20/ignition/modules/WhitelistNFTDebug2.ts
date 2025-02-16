// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WhitelistNFTDebug2Module = buildModule(
  "WhitelistNFTDebug2Module",
  (m) => {
    const contract = m.contract("WhitelistNFTDebug2", [], {});

    return { contract };
  }
);

export default WhitelistNFTDebug2Module;
