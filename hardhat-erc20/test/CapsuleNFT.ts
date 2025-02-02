import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("CapsuleNFT", function () {
  async function deployWithFixture() {
    const [owner, otherOne, otherTwo] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("CapsuleNFT", [], {
      account: owner.account.address,
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
    it("metdata", async function () {
      const { contract, owner } = await loadFixture(deployWithFixture);

      const [name, symbol] = await Promise.all([
        contract.read.name(),
        contract.read.symbol()
      ]);
      expect(name).to.equal("CapsuleNFT");
      expect(symbol).to.equal("CAPSULE-NFT");

      const ownerFromContract = await contract.read.owner();
      const ownerFromWallet = owner.account.address;
      expect(ownerFromContract.toLowerCase()).to.equal(ownerFromWallet.toLowerCase());
    })

    describe("mint", function () {
      it("normal", async function () {
        // todo
      })
      it("no whitelist", async function () {
        const { contract, otherOne, otherTwo } = await loadFixture(deployWithFixture);
  
        await expect(
          contract.write.mint({
            account: otherOne.account.address,
          })
        ).to.be.rejectedWith("Not whitelisted");
        await expect(
          contract.write.mint({
            account: otherTwo.account.address,
          })
        ).to.be.rejectedWith("Not whitelisted");
      })
    })

    it("addWhitelist", async function () {
      // todo
    })
    it("recovery", async function () {
      // todo
    })

    it("addWhitelist by not owner", async function () {
      const { contract, otherOne } = await loadFixture(deployWithFixture);

      await expect(
        contract.write.addWhitelist(
          [otherOne.account.address, 1],
          { account: otherOne.account.address }
        )
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    })
    it("addWhitelist by not owner", async function () {
      const { contract, otherOne } = await loadFixture(deployWithFixture);

      await expect(
        contract.write.recovery(
          [1],
          { account: otherOne.account.address }
        )
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    })
  });
});
