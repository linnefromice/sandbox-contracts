import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const expectRevert = async (
  fn: () => Promise<any>,
  expectedErrorMessage: string
) => {
  try {
    await fn();
    throw new Error("Expected revert, but no error was thrown"); // NOTE: should not reach here
  } catch (error: any) {
    expect(error.details).to.include(expectedErrorMessage);
  }
};

describe("WhitelistNFTDebug", function () {
  async function deployWithFixture() {
    // const lockedAmount = parseGwei("1");
    const [owner, ...others] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("WhitelistNFTDebug", [], {});

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherAccounts: others,
      publicClient,
    };
  }

  it("initialize", async function () {
    const { contract } = await loadFixture(deployWithFixture);
    const [name, symbol, isRevealed] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.isRevealed(),
    ]);
    expect(name).to.equal("Whitelist NFT Debug");
    expect(symbol).to.equal("WHITELIST-NFT-DEBUG");
    expect(isRevealed).to.equal(false);
  });
});
