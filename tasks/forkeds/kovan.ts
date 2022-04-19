import { task } from 'hardhat/config'
import BigNumberJs from 'bignumber.js'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

BigNumberJs.config({ EXPONENTIAL_AT: 1e9 })

task("kovan:network", "kovan:network").setAction(async ({}, hre: HardhatRuntimeEnvironment) => {
  const { network, ethers } = hre
  console.log(network.name)
  console.log(network.config.chainId)
  const blockNumber = await ethers.provider.getBlockNumber()
  console.log(blockNumber)
})