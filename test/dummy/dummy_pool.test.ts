import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ContractTransaction } from "ethers"
import { ethers } from "hardhat"
import { DummyToken } from "../../types"
import { setup } from "./utils"

describe("DummyPool", () => {
  const mint = async (token: DummyToken, user: SignerWithAddress, amount?: number) => {
    const _amount = amount ?? "10000"
    const tx = await token.connect(user).mint(_amount)
    await tx.wait()
  }

  it(".deposit", async () => {
    const [deployer, user] = await ethers.getSigners()
    const { token, pool } = await setup(deployer)
    await mint(token, user, 1)
    let tx: ContractTransaction

    expect((await token.balanceOf(user.address)).toNumber()).to.eq(1)
    expect((await pool.balances(user.address)).toNumber()).to.eq(0)

    tx = await token.connect(user).approve(pool.address, 1)
    await tx.wait()
    tx = await pool.connect(user).deposit(1)
    await tx.wait()

    expect((await token.balanceOf(user.address)).toNumber()).to.eq(0)
    expect((await pool.balances(user.address)).toNumber()).to.eq(1)
  })
})