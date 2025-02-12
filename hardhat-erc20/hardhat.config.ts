import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
import * as fs from "fs";
import type { HardhatUserConfig } from "hardhat/config";
import * as path from "path";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_PATHS = ["tasks"];
if (!SKIP_LOAD) {
  TASK_PATHS.forEach((folder) => {
    const tasksPath = path.join(__dirname, folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

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
