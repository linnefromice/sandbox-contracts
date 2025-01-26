import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("ICORepresentative", function () {
  async function deployWithFixture() {
    // const lockedAmount = parseGwei("1");
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("ICORepresentative", [], {
      // value: lockedAmount,
    });

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deploy", function () {
    it("test", async function () {
      const { contract, owner } = await loadFixture(deployWithFixture);

      const [name, symbol, decimals] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.decimals(),
      ]);
      expect(name).to.equal("ICORepresentative");
      expect(symbol).to.equal("ICO-R");
      expect(decimals).to.equal(18);

      const _totalSupply = 2_000_000_000n * 10n ** 18n;
      const totalSupply = await contract.read.totalSupply();
      // console.log(totalSupply.toString());
      expect(totalSupply.toString()).to.equal(_totalSupply.toString());
      const balance = await contract.read.balanceOf([owner.account.address]);
      // console.log(balance.toString());
      expect(balance.toString()).to.equal(_totalSupply.toString());
    });
  });
});
