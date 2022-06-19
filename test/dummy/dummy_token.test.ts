import { ethers } from "hardhat"
import { DummyToken__factory } from "../../types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ContractTransaction } from "ethers"

describe("DummyToken", () => {
  const setup = async (deployer?: SignerWithAddress) => {
    const _signer = deployer ?? (await ethers.getSigners())[0]
    const token = await new DummyToken__factory(_signer).deploy()
    await token.deployTransaction.wait()
    return { token }
  }

  it("name, symbol, decimals", async () => {
    const { token } = await setup()
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
      token.totalSupply()
    ])
    expect(name).to.eq("Dummy Token")
    expect(symbol).to.eq("DUMMY")
    expect(decimals).to.eq(18)
    expect(totalSupply.isZero()).to.eq(true)
  })

  it(".mint", async () => {
    const [deployer, user] = await ethers.getSigners()
    const { token } = await setup(deployer)
    let tx: ContractTransaction
    const before_balance = await token.balanceOf(user.address)
    expect(before_balance.toString()).to.eq("0")
    tx = await token.connect(user).mint("1")
    await tx.wait()
    const after_balance = await token.balanceOf(user.address)
    expect(after_balance.toString()).to.eq("1")
  })
})