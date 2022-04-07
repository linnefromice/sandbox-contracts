import * as dotenv from "dotenv";
import fs from 'fs'
import path from 'path'

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers'
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { NetworkUserConfig } from "hardhat/types";

dotenv.config();

const taskPaths = ["miscs", "samples"]
taskPaths.forEach((folder) => {
  const tasksPath = path.join(__dirname, 'tasks', folder)
  fs.readdirSync(tasksPath)
    .filter((_path) => _path.includes('.ts'))
    .forEach((task) => {
      require(`${tasksPath}/${task}`)
    })
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const MNEMONIC = process.env.MNEMONIC || ''
const BWARE_LABS_KEY = process.env.BWARE_LABS_KEY || '' // if use BwareLabs for Astar, set this parameter
const getAstarNetworkUrl = (networkName: string) =>
  BWARE_LABS_KEY
    ? `https://${networkName}-api.bwarelabs.com/${BWARE_LABS_KEY}`
    : networkName === 'shiden'
      ? `https://evm.shiden.astar.network`
      : `https://rpc.${
          networkName === 'astar' ? 'astar' : `${networkName}.astar`
        }.network:8545`

const INFURA_KEY = process.env.INFURA_KEY || '' // if use Infura, set this parameter
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || '' // if use Alchemy, set this parameter
const getEthereumNetworkUrl = (networkName: string) =>
  INFURA_KEY
    ? `https://${networkName}.infura.io/v3/${INFURA_KEY}`
    : `https://eth-${networkName}.alchemyapi.io/v2/${ALCHEMY_KEY}`

const AstarNetworks = ['astar', 'shiden', 'shibuya'] as const
const EthereumNetworks = ['mainnet', 'rinkeby', 'kovan'] as const
type tNetwork = typeof AstarNetworks[number] | typeof EthereumNetworks[number]
const GWEI = 1000 * 1000 * 1000
const gasPrices: { [key in tNetwork]: number } = {
  mainnet: 1 * GWEI,
  rinkeby: 3 * GWEI,
  kovan: 3 * GWEI,
  astar: 1 * GWEI,
  shiden: 1 * GWEI,
  shibuya: 3 * GWEI
}

const getCommonNetworkConfig = ({
  networkName,
  chainId,
}: {
  networkName: tNetwork
  chainId: number
}): NetworkUserConfig => ({
  url: AstarNetworks.some((n) => n === networkName)
    ? getAstarNetworkUrl(networkName)
    : getEthereumNetworkUrl(networkName),
  chainId: chainId,
  gasPrice: gasPrices[networkName],
  // accounts: {
  //   mnemonic: MNEMONIC,
  //   path: "m/44'/60'/0'/0",
  //   initialIndex: 0,
  //   count: 20,
  // },
})

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    rinkeby: getCommonNetworkConfig({
      networkName: 'rinkeby',
      chainId: 4,
    }),
    kovan: getCommonNetworkConfig({
      networkName: 'kovan',
      chainId: 42,
    }),
    astar: getCommonNetworkConfig({
      networkName: 'astar',
      chainId: 592,
    }),
    shiden: getCommonNetworkConfig({
      networkName: 'shiden',
      chainId: 336,
    }),
    shibuya: getCommonNetworkConfig({
      networkName: 'shibuya',
      chainId: 81,
    }),
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
};

export default config;
