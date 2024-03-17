import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, Network } from 'hardhat/types'
import { GaugeController__factory } from '../../libs/contracts/__generated__'
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

task("confirm:curve:GaugeController", "confirm:curve:GaugeController").setAction(
  async ({}, hre: HardhatRuntimeEnvironment) => {
    const { network, provider } = await setup(hre)

    const GAUGES = {
      frax: "0x72E158d38dbd50A483501c24f792bDAAA3e7D55C", // gauge
      // "UST_whv23CRV-f": "0xCEAF7747579696A2F0bb206a14210e3c9e6fB269", // pool (factory)
      steth: "0x182B723a58739a9c974cFDB385ceaDb237453c28", // gauge
      // cvxcrv: "0x9D0464996170c6B9e75eED71c68B99dDEDf279e8", // pool (factory)
      mim: "0xd8b712d29381748db89c36bca0138d7c75866ddf"
    }

    const ADDRESS = "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB" // Curve's GaugeController in mainnet
    const VOTER_PROXY = "0x989AEb4d175e16225E39E87d0D97A3360524AD80" // Convex's VoterProxy in mainnet

    const instance = GaugeController__factory.connect(ADDRESS, provider)
    console.log(await instance.get_total_weight())
    console.log("> GaugeController#vote_user_power")
    console.log(await instance.vote_user_power(VOTER_PROXY))
    // console.log(await instance.vote_user_power("0x6543076E4315bd82129105890Bc49c18f496a528"))
    console.log("> GaugeController#last_user_vote")
    const lastUserVotes = await Promise.all([
      instance.last_user_vote(VOTER_PROXY, GAUGES.frax),
      // instance.last_user_vote(VOTER_PROXY, GAUGES["UST_whv23CRV-f"]),
      instance.last_user_vote(VOTER_PROXY, GAUGES.steth),
      // instance.last_user_vote(VOTER_PROXY, GAUGES.cvxcrv),
      instance.last_user_vote(VOTER_PROXY, GAUGES.mim),
    ])
    for (const _v of lastUserVotes) console.log(new Date(_v.toNumber() * 1000))
    const voteUserSlopes = await Promise.all([
      instance.vote_user_slopes(VOTER_PROXY, GAUGES.frax),
      // instance.vote_user_slopes(VOTER_PROXY, GAUGES["UST_whv23CRV-f"]),
      instance.vote_user_slopes(VOTER_PROXY, GAUGES.steth),
      // instance.vote_user_slopes(VOTER_PROXY, GAUGES.cvxcrv),
      instance.vote_user_slopes(VOTER_PROXY, GAUGES.mim),
    ])
    for (const _v of voteUserSlopes) console.log(_v.power.toNumber() / 100)
  }
)
