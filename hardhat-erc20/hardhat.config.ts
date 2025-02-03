import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      url: `https://eth.llamarpc.com`,
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
    sepolia: {
      url: `https://eth-sepolia.api.onfinality.io/public`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
