import { task } from 'hardhat/config'
import BigNumberJs from 'bignumber.js'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { ERC20__factory } from '../../libs/contracts/__generated__'

BigNumberJs.config({ EXPONENTIAL_AT: 1e9 })

const addresses = {
  tokens: {
    KGL: "0x047Aba0887db6Cde209fBa6f4F306e53B4F292Fd",
    "3Kgl": "0xA8c822C4e7b8dD6cD4258873185bCf20239F9303",
    DAI: "0x6179d4c292c21FfFcE9A9fcE3825AF3E71Dd5a6D",
    WETH: "0x95b8e46A64AF642B15eAf90641dE4E254730f500",
    MUUU: "0xac0C9E9b1A3514E166B996baCFfAdF63F8a6bfC2",
    muKGL: "0x18E1642D9fE65a5e478426EE1737201229370ee3",
  }
}

const displayCommonStatus = async (hre: HardhatRuntimeEnvironment) => {
  const { network, ethers } = hre
  console.log(network.name)
  console.log(network.config.chainId)
  const blockNumber = await ethers.provider.getBlockNumber()
  console.log(blockNumber)
}

const getTokenInfo = async (hre: HardhatRuntimeEnvironment, address: string) => {
  const _instance = ERC20__factory.connect(address, hre.ethers.provider)
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    _instance.name(),
    _instance.symbol(),
    _instance.decimals(),
    _instance.totalSupply()
  ])
  return {
    name,
    symbol,
    decimals,
    totalSupply
  }
}

task("kovan:tokens", "kovan:tokens").setAction(async ({}, hre: HardhatRuntimeEnvironment) => {
  await displayCommonStatus(hre)

  console.log(await getTokenInfo(hre, addresses.tokens.KGL))
  console.log(await getTokenInfo(hre, addresses.tokens["3Kgl"]))
  console.log(await getTokenInfo(hre, addresses.tokens.DAI))
  console.log(await getTokenInfo(hre, addresses.tokens.WETH))
  console.log(await getTokenInfo(hre, addresses.tokens.MUUU))
  console.log(await getTokenInfo(hre, addresses.tokens.muKGL))
})