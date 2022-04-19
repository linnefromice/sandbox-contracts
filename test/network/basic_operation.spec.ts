import { ethers } from "hardhat"

describe("Network", () => {
  it("basic operation", async () => {
    const provider = await ethers.provider
    
    const currentBlockNumber = await provider.getBlockNumber()
    console.log(currentBlockNumber)
    const currentBlock = await provider.getBlock(currentBlockNumber)
    console.log(currentBlock)
    console.log(currentBlock.timestamp)
    console.log(new Date(currentBlock.timestamp))
    
    console.log("> evm_mine")
    await ethers.provider.send("evm_mine", [])
    await ethers.provider.send("evm_increaseTime", [100]) // millisecond
    await ethers.provider.send("evm_increaseTime", [100])
    await ethers.provider.send("evm_increaseTime", [100])

    const _currentBlockNumber = await provider.getBlockNumber()
    console.log(_currentBlockNumber)
    const _currentBlock = await provider.getBlock(_currentBlockNumber)
    console.log(_currentBlock)
    console.log(_currentBlock.timestamp)
    console.log(new Date(_currentBlock.timestamp))

    console.log("> evm_mine")
    await ethers.provider.send("evm_mine", [])

    const __currentBlockNumber = await provider.getBlockNumber()
    console.log(__currentBlockNumber)
    const __currentBlock = await provider.getBlock(__currentBlockNumber)
    console.log(__currentBlock)
    console.log(__currentBlock.timestamp)
    console.log(new Date(__currentBlock.timestamp))

  })
})