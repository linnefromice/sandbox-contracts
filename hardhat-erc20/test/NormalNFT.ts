import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("NormalNFT", function () {
  async function deployWithFixture() {
    // const lockedAmount = parseGwei("1");
    const [owner, otherOne, otherTwo] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("NormalNFT", [], {
      // value: lockedAmount,
    });

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherOne,
      otherTwo,
      publicClient,
    };
  }

  describe("Deploy", function () {
    it("test", async function () {
      const { contract, owner, otherOne, otherTwo } = await loadFixture(deployWithFixture);

      const [name, symbol] = await Promise.all([
        contract.read.name(),
        contract.read.symbol()
      ]);
      expect(name).to.equal("NormalNFT");
      expect(symbol).to.equal("NORMAL-NFT");

      const ownerAddr = owner.account.address;
      const oneAddr = otherOne.account.address
      const twoAddr = otherTwo.account.address
      expect(await contract.read.balanceOf([oneAddr])).to.equal(0n);
      expect(await contract.read.balanceOf([twoAddr])).to.equal(0n);

      await contract.write.mint([oneAddr, 10n]);
      expect(await contract.read.balanceOf([oneAddr])).to.equal(1n);
      expect(await contract.read.balanceOf([twoAddr])).to.equal(0n);
      expect((await contract.read.ownerOf([10n])).toLowerCase()).to.equal(oneAddr.toLowerCase());

      await contract.write.mint([twoAddr, 20n]);
      await contract.write.mint([twoAddr, 25n]);
      expect(await contract.read.balanceOf([oneAddr])).to.equal(1n);
      expect(await contract.read.balanceOf([twoAddr])).to.equal(2n);
      expect((await contract.read.ownerOf([10n])).toLowerCase()).to.equal(oneAddr.toLowerCase());
      expect((await contract.read.ownerOf([20n])).toLowerCase()).to.equal(twoAddr.toLowerCase());
      expect((await contract.read.ownerOf([25n])).toLowerCase()).to.equal(twoAddr.toLowerCase());
    });
  });
});
