import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { zeroAddress } from "viem";
import { ethers } from "ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import abi from "../artifacts/contracts/nfts/WhitelistNFT2.sol/WhitelistNFT2.json";

const BASE_URI = "https://example.com/metadata/";
const HIDDEN_URI = BASE_URI + "hidden.json";

const CONTRACT_INTERFACE = new ethers.Interface(abi["abi"]);

describe("WhitelistNFT2", function () {
  async function deployWithFixture() {
    // const lockedAmount = parseGwei("1");
    const [owner, ...others] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract(
      "WhitelistNFT2",
      [
        BASE_URI,
        HIDDEN_URI
      ],
      {
        // value: lockedAmount,
      }
    );

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
    const [
      name,
      symbol,
      revealedBaseURI,
      hiddenURI,
      isRevealed
    ] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.revealedBaseURI(),
      contract.read.hiddenURI(),
      contract.read.isRevealed()
    ]);
    expect(name).to.equal("WhitelistNFT2");
    expect(symbol).to.equal("WHITELIST-NFT-2");
    expect(revealedBaseURI).to.equal(BASE_URI);
    expect(hiddenURI).to.equal(HIDDEN_URI);
    expect(isRevealed).to.equal(false);

    const tokenUrlWhenNotRevealed = await contract.read.tokenURI([0n]);
    expect(tokenUrlWhenNotRevealed).to.equal(HIDDEN_URI);
  });

  describe("manage-token", function () {
    it("scenario", async function () {
      const { contract, otherAccounts } = await loadFixture(deployWithFixture);
      const [otherAccount] = otherAccounts;

      // execute .addToken
      const tokenId = 1n;
      const tokenFilepath = "1.json";
      await contract.write.addToken([tokenId, tokenFilepath]);
      expect(await contract.read.getTokenIdList()).to.deep.equal([tokenId]);
      expect(await contract.read.isSettedTokenURI([tokenId])).to.equal(true);
      // NOTE: whitelist is not set
      expect(await contract.read.whitelistList([tokenId])).to.equal(zeroAddress);

      // execute .addWhitelist
      await contract.write.addWhitelist([otherAccount.account.address, tokenId]);
      expect((await contract.read.whitelistList([tokenId])).toLowerCase()).to.equal(otherAccount.account.address.toLowerCase());

      // execute .reveal & check tokenURI
      expect(await contract.read.isRevealed()).to.equal(false);
      expect(await contract.read.tokenURI([tokenId])).to.equal(HIDDEN_URI);
      await contract.write.reveal();
      expect(await contract.read.isRevealed()).to.equal(true);
      // NOTE: tokenURI is revealed, but tokenId is not minted

      try {
        await contract.read.tokenURI([tokenId]);
        expect(false).to.be.true; // NOTE: should not reach here
      } catch (error: any) {
        expect(error.details).to.include("ERC721NonexistentToken");
      }
      // await expect(contract.read.tokenURI([tokenId])).to.be.
      //     .revertedWith("ContractFunctionExecutionError");
      // CONTRACT_INTERFACE.forEachError((error) => console.log(error));
      // await expect(contract.read.tokenURI([tokenId])).to.be
      //     .revertedWithCustomError({ interface: CONTRACT_INTERFACE }, "ERC721NonexistentToken");

      // execute .mint
      await contract.write.mintByOwner([otherAccount.account.address, tokenId]);
      expect((await contract.read.ownerOf([tokenId])).toLowerCase()).to.equal(otherAccount.account.address.toLowerCase());
      expect(await contract.read.tokenURI([tokenId])).to.equal(BASE_URI + tokenFilepath);
    });
  });
});

