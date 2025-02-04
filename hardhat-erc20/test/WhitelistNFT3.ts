import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
// import abi from "../artifacts/contracts/nfts/WhitelistNFT2.sol/WhitelistNFT2.json";
// const CONTRACT_INTERFACE = new ethers.Interface(abi["abi"]);

const NFT_NAME = "Whitelist NFT 3";
const NFT_SYMBOL = "WHITELIST-NFT-3";
const BASE_URI = "https://example.com/metadata/";
const HIDDEN_URI = BASE_URI + "hidden.json";

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

describe("WhitelistNFT3", function () {
  async function deployWithFixture() {
    // const lockedAmount = parseGwei("1");
    const [owner, ...others] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract(
      "WhitelistNFT3",
      [NFT_NAME, NFT_SYMBOL, BASE_URI, HIDDEN_URI],
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
      isRevealed,
      isMintExpired,
    ] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.revealedBaseURI(),
      contract.read.hiddenURI(),
      contract.read.isRevealed(),
      contract.read.isMintExpired(),
    ]);
    expect(name).to.equal(NFT_NAME);
    expect(symbol).to.equal(NFT_SYMBOL);
    expect(revealedBaseURI).to.equal(BASE_URI);
    expect(hiddenURI).to.equal(HIDDEN_URI);
    expect(isRevealed).to.equal(false);
    expect(isMintExpired).to.equal(false);
    const tokenUrlWhenNotRevealed = await contract.read.tokenURI([0n]);
    expect(tokenUrlWhenNotRevealed).to.equal(HIDDEN_URI);
  });

  describe("mint", () => {
    it("scenario", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1, other2] = otherAccounts;

      // add token
      await contract.write.addToken([1n, "1.json"], { account: owner.account });
      await contract.write.addToken([2n, "2.json"], { account: owner.account });
      await contract.write.addWhitelist([other1.account.address, 1n], {
        account: owner.account,
      });
      await contract.write.addWhitelist([other2.account.address, 2n], {
        account: owner.account,
      });

      // mint
      await contract.write.mint({ account: other1.account });
      await contract.write.mint({ account: other2.account });
      expect((await contract.read.ownerOf([1n])).toLowerCase()).to.equal(
        other1.account.address.toLowerCase()
      );
      expect((await contract.read.ownerOf([2n])).toLowerCase()).to.equal(
        other2.account.address.toLowerCase()
      );

      expect(await contract.read.tokenURI([1n])).to.equal(HIDDEN_URI);
      expect(await contract.read.tokenURI([2n])).to.equal(HIDDEN_URI);
      await contract.write.reveal();
      expect(await contract.read.tokenURI([1n])).to.equal(BASE_URI + "1.json");
      expect(await contract.read.tokenURI([2n])).to.equal(BASE_URI + "2.json");
    });

    it("about mint", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1] = otherAccounts;

      await contract.write.addToken([1n, "1.json"], { account: owner.account });
      await contract.write.addWhitelist([other1.account.address, 1n], {
        account: owner.account,
      });
      await contract.write.mint({ account: other1.account });

      await expectRevert(
        () => contract.write.mint({ account: other1.account }),
        "AlreadyMinted"
      );
    });

    it("about addToken", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1] = otherAccounts;

      await expectRevert(
        () =>
          contract.write.mintByOwner([other1.account.address, 1n], {
            account: owner.account,
          }),
        "NotInitializedToken"
      );
    });

    it("about whitelist", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1, other2] = otherAccounts;
      await contract.write.addToken([1n, "1.json"], { account: owner.account });

      // not whitelisted
      await expectRevert(
        () => contract.write.mint({ account: other1.account }),
        "NotWhitelisted"
      );
      // receiver is whitelisted, but executed by not receiver
      await contract.write.addWhitelist([other1.account.address, 1n], {
        account: owner.account,
      });
      await expectRevert(
        () => contract.write.mint({ account: other2.account }),
        "NotWhitelisted"
      );
      // check 1tokenId per 1address
      await expectRevert(
        () =>
          contract.write.addWhitelist([other1.account.address, 1n], {
            account: owner.account,
          }),
        "AlreadyWhitelisted"
      );

      await contract.write.mint({ account: other1.account });
      expect((await contract.read.ownerOf([1n])).toLowerCase()).to.equal(
        other1.account.address.toLowerCase()
      );
    });

    it("about expireMintAction", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1, other2] = otherAccounts;

      await contract.write.addTokenWithReceiver(
        [{ tokenId: 1n, uri: "1.json", user: other1.account.address }],
        { account: owner.account }
      );
      // before expireMintAction
      await contract.write.mint({ account: other1.account });
      await contract.write.expireMintAction({ account: owner.account });
      expect(await contract.read.isMintExpired()).to.equal(true);
      // after expireMintAction
      await expectRevert(
        () => contract.write.mint({ account: other1.account }),
        "MintExpired"
      );
    });
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

      // execute .addWhitelist
      await contract.write.addWhitelist([
        otherAccount.account.address,
        tokenId,
      ]);
      expect(
        await contract.read.whitelistList([otherAccount.account.address])
      ).to.equal(tokenId);

      // execute .reveal & check tokenURI
      expect(await contract.read.isRevealed()).to.equal(false);
      expect(await contract.read.tokenURI([tokenId])).to.equal(HIDDEN_URI);
      await contract.write.reveal();
      expect(await contract.read.isRevealed()).to.equal(true);
      // NOTE: tokenURI is revealed, but tokenId is not minted

      await expectRevert(
        () => contract.read.tokenURI([tokenId]),
        "ERC721NonexistentToken"
      );
      // await expect(contract.read.tokenURI([tokenId])).to.be.
      //     .revertedWith("ContractFunctionExecutionError");
      // CONTRACT_INTERFACE.forEachError((error) => console.log(error));
      // await expect(contract.read.tokenURI([tokenId])).to.be
      //     .revertedWithCustomError({ interface: CONTRACT_INTERFACE }, "ERC721NonexistentToken");

      // execute .mint
      await contract.write.mintByOwner([otherAccount.account.address, tokenId]);
      expect((await contract.read.ownerOf([tokenId])).toLowerCase()).to.equal(
        otherAccount.account.address.toLowerCase()
      );
      expect(await contract.read.tokenURI([tokenId])).to.equal(
        BASE_URI + tokenFilepath
      );
    });

    it("getTokenIdList", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [otherAccount] = otherAccounts;

      // by not owner
      await expectRevert(
        () =>
          contract.read.getTokenIdList({
            account: otherAccount.account,
          }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      expect(await contract.read.getTokenIdList()).to.deep.equal([]);
    });

    it("addToken", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [otherAccount] = otherAccounts;

      // by not owner
      await expectRevert(
        () =>
          contract.write.addToken([1n, "sample.json"], {
            account: otherAccount.account,
          }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      await contract.write.addToken([1n, "1.json"], { account: owner.account });
      await contract.write.addToken([2n, "2.json"], { account: owner.account });
      expect(await contract.read.getTokenIdList()).to.deep.equal([1n, 2n]);
      expect(await contract.read.isSettedTokenURI([1n])).to.equal(true);
      expect(await contract.read.isSettedTokenURI([2n])).to.equal(true);
      expect(await contract.read.isSettedTokenURI([3n])).to.equal(false);
    });

    it("addWhitelist", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1, other2] = otherAccounts;

      // by not owner
      await expectRevert(
        () =>
          contract.write.addWhitelist([other1.account.address, 1n], {
            account: other1.account,
          }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      await contract.write.addWhitelist([other1.account.address, 1n], {
        account: owner.account,
      });
      await contract.write.addWhitelist([other2.account.address, 2n], {
        account: owner.account,
      });
      expect(
        await contract.read.whitelistList([other1.account.address])
      ).to.equal(1n);
      expect(
        await contract.read.whitelistList([other2.account.address])
      ).to.equal(2n);
      expect(await contract.read.getTokenIdList()).to.deep.equal([]);
      expect(await contract.read.isSettedTokenURI([1n])).to.equal(false);
      expect(await contract.read.isSettedTokenURI([2n])).to.equal(false);
      expect(await contract.read.isSettedTokenURI([3n])).to.equal(false);
    });

    it("reveal", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1] = otherAccounts;
      expect(await contract.read.isRevealed()).to.equal(false);

      // by not owner
      await expectRevert(
        () => contract.write.reveal({ account: other1.account }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      await contract.write.reveal({ account: owner.account });
      expect(await contract.read.isRevealed()).to.equal(true);
    });

    it("expireMintAction", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1] = otherAccounts;

      // by not owner
      await expectRevert(
        () => contract.write.expireMintAction({ account: other1.account }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      await contract.write.expireMintAction({ account: owner.account });
      expect(await contract.read.isMintExpired()).to.equal(true);
    });

    it("mintByOwner", async function () {
      const { contract, owner, otherAccounts } = await loadFixture(
        deployWithFixture
      );
      const [other1, other2] = otherAccounts;

      // by not owner
      await expectRevert(
        () =>
          contract.write.mintByOwner([other1.account.address, 1n], {
            account: other2.account,
          }),
        "OwnableUnauthorizedAccount"
      );

      // by owner
      await contract.write.addToken([1n, "1.json"], { account: owner.account });
      await contract.write.addToken([2n, "2.json"], { account: owner.account });
      await contract.write.mintByOwner([other1.account.address, 1n], {
        account: owner.account,
      });
      await contract.write.mintByOwner([other2.account.address, 2n], {
        account: owner.account,
      });
      await contract.write.reveal();
      expect((await contract.read.ownerOf([1n])).toLowerCase()).to.equal(
        other1.account.address.toLowerCase()
      );
      expect(await contract.read.tokenURI([1n])).to.equal(BASE_URI + "1.json");
      expect((await contract.read.ownerOf([2n])).toLowerCase()).to.equal(
        other2.account.address.toLowerCase()
      );
      expect(await contract.read.tokenURI([2n])).to.equal(BASE_URI + "2.json");
    });
  });
});
