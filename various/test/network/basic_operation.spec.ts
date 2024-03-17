import { ethers } from "hardhat"
import { format } from "date-fns"
import { expect } from "chai"

describe("Network", () => {
  const _dateFormat = "yyyy/MM/dd hh:mm:ss.SSS"
  it("basic operation", async () => {
    const provider = await ethers.provider
    
    let currentBlockNumber
    currentBlockNumber = await provider.getBlockNumber()
    expect(currentBlockNumber).to.eq(0)
    const firstBlock = await provider.getBlock(currentBlockNumber)
    // console.log(currentBlock)
    expect(format(new Date(firstBlock.timestamp), "yyyyMMdd")).to.eq("19700120")
    console.log(format(new Date(firstBlock.timestamp), _dateFormat))
    
    console.log("> evm_mine")
    await ethers.provider.send("evm_mine", [])
    await ethers.provider.send("evm_increaseTime", [100])

    currentBlockNumber = await provider.getBlockNumber()
    expect(currentBlockNumber).to.eq(1)
    const secondBlock = await provider.getBlock(currentBlockNumber)
    // console.log(secondBlock)
    
    // not reflect increased time by evm_increaseTime because not mined
    expect(secondBlock.timestamp - firstBlock.timestamp).to.eq(1)
    console.log(format(new Date(secondBlock.timestamp), _dateFormat))

    console.log("> evm_mine")
    await ethers.provider.send("evm_mine", [])

    currentBlockNumber = await provider.getBlockNumber()
    expect(currentBlockNumber).to.eq(2)
    const thirdBlock = await provider.getBlock(currentBlockNumber)
    // console.log(thirdBlock)

    // reflect increased time
    expect(thirdBlock.timestamp - secondBlock.timestamp).to.eq(100)
    console.log(format(new Date(thirdBlock.timestamp), _dateFormat))
  })
})