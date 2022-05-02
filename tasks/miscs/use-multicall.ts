import keccak256 from "keccak256"
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import jsonfile from "jsonfile"
import { BigNumber } from "ethers"
import { ERC20__factory, Multicall__factory } from "../../libs/contracts/__generated__"

const multicall_abi = jsonfile.readFileSync("./abis/Multicall.json")

const MULTICALL_ADDRESS = "0xeefba1e63905ef1d7acba5a8513c70307c1ce441"
const TOKENS = {
  USDC: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6
  },
  USDT: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6
  },
  DAI: {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18
  }
}

/**
 * use multicall by only ethersjs
 * - support only mainnet
 */
task("multicall", "multicall").setAction(async ({}, hre: HardhatRuntimeEnvironment) => {
  const { ethers } = hre

  const multicall = new ethers.Contract(
    MULTICALL_ADDRESS,
    new ethers.utils.Interface(multicall_abi),
    ethers.provider
  )
  const selector = keccak256("balanceOf(address)").toString('hex').substr(0, 8)
  const address = "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7" // Curve.fi: DAI/USDC/USDT Pool
  const param = address.substring(2).padStart(64, "0")
  // [NOTE] other data
  // const address = "0x2c8868B79C6BF5A646a4e5d22B18DA45eA94D425"
  // const inputs = [{
  //   target: "0xD533a949740bb3306d119CC777fa900bA034cd52", // CRV
  //   callData: `0x${selector}${param}`
  // }]

  const inputs = [
    {
      target: TOKENS.USDC.address, // USDC
      callData: `0x${selector}${param}`
    },
    {
      target: TOKENS.USDT.address, // USDT
      callData: `0x${selector}${param}`
    },
    {
      target: TOKENS.DAI.address, // DAI
      callData: `0x${selector}${param}`
    },
  ]
  const result = await multicall.callStatic.aggregate(inputs);
  for (const [index, key] of Object.keys(TOKENS).entries()) {
    console.log(
      ethers.utils.formatUnits(
        BigNumber.from(result[1][index]),
        TOKENS[key as keyof typeof TOKENS].decimals
      )
    )
  }
})

task("multicall-with-typechain", "multicall-with-typechain").setAction(async ({}, hre: HardhatRuntimeEnvironment) => {
  const { ethers } = hre
  const multicall = Multicall__factory.connect(
    "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
    ethers.provider
  )
  const address = "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7" // Curve.fi: DAI/USDC/USDT Pool
  const _interface = ERC20__factory.createInterface()
  const callData = [
    {
      target: TOKENS.USDC.address, // USDC
      callData: _interface.encodeFunctionData("balanceOf", [address])
    },
    {
      target: TOKENS.USDT.address, // USDT
      callData: _interface.encodeFunctionData("balanceOf", [address])
    },
    {
      target: TOKENS.DAI.address, // DAI
      callData: _interface.encodeFunctionData("balanceOf", [address])
    },
  ]
  const result = await multicall.callStatic.aggregate(callData)
  for (const [index, key] of Object.keys(TOKENS).entries()) {
    console.log(
      ethers.utils.formatUnits(
        _interface.decodeFunctionResult(
          "balanceOf",
          result.returnData[index]
        )[0],
      TOKENS[key as keyof typeof TOKENS].decimals)
    )
  }
})