import { ethers } from "hardhat"
import { expect } from "chai"
import { ContractTransaction } from "ethers"
import { setupToken } from "./utils"

describe("DummyToken", () => {
  it("name, symbol, decimals", async () => {
    const { token } = await setupToken()
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
    const { token } = await setupToken(deployer)
    let tx: ContractTransaction
    const before_balance = await token.balanceOf(user.address)
    expect(before_balance.toString()).to.eq("0")
    tx = await token.connect(user).mint("1")
    await tx.wait()
    const after_balance = await token.balanceOf(user.address)
    expect(after_balance.toString()).to.eq("1")
  })
})