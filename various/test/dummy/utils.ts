import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { DummyPool__factory, DummyToken__factory } from "../../types"

export const setupToken = async (deployer?: SignerWithAddress) => {
  const _signer = deployer ?? (await ethers.getSigners())[0]
  const token = await new DummyToken__factory(_signer).deploy()
  await token.deployTransaction.wait()
  return { token }
}

export const setupPool = async (tokenAddress: string, deployer?: SignerWithAddress) => {
  const _signer = deployer ?? (await ethers.getSigners())[0]
  const pool = await new DummyPool__factory(_signer).deploy(tokenAddress)
  await pool.deployTransaction.wait()
  return { pool }
}

export const setup = async (deployer?: SignerWithAddress) => {
  const _signer = deployer ?? (await ethers.getSigners())[0]
  const { token } = await setupToken(_signer)
  const { pool } = await setupPool(token.address, _signer)
  return {
    token,
    pool
  }
}