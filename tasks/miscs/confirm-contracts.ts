import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, Network } from 'hardhat/types'
import { VotingEscrow__factory } from '../../libs/contracts/__generated__/factories/VotingEscrow__factory'

const setup = async (hre: HardhatRuntimeEnvironment) => {
  const { network, ethers } = hre
  // if (isNotShiden(network))
  //   throw new Error(`not shiden, currently ${network.name}!!`)
  console.log(`network: ${network.name}`)

  // const [signer] = await ethers.getSigners()
  // console.log(`deployer: ${await signer.getAddress()}`)

  return {
    ethers,
    network,
    // signer,
    provider: ethers.provider
  }
}

task('confirm:curve:VotingEscrow', 'confirm:curve:VotingEscrow').setAction(
  async ({}, hre: HardhatRuntimeEnvironment) => {
    const { network, provider } = await setup(hre)

    if (network.name !== "shiden") throw new Error("only support shiden")

    const _addr = "0xDFe3C797977a0B40C90E7c2869407327a4208654"

    const _instance = VotingEscrow__factory.connect(
      _addr,
      provider
    )
    console.log(`name ... ${await _instance.name()}`)
    console.log(`symbol ... ${await _instance.symbol()}`)
    console.log(`decimals ... ${await _instance.decimals()}`)
    console.log(`supply ... ${await _instance.supply()}`)
    console.log(`smart_wallet_checker ... ${await _instance.smart_wallet_checker()}`)
    console.log(`admin ... ${await _instance.admin()}`)
  }
)
