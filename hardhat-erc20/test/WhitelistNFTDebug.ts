import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { zeroAddress } from "viem";

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
    const { contract, owner } = await loadFixture(deployWithFixture);
    const [name, symbol, isRevealed, isMintExpired] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.isRevealed(),
      contract.read.isMintExpired(),
    ]);
    expect(name).to.equal("Whitelist NFT Debug");
    expect(symbol).to.equal("WHITELIST-NFT-DEBUG");
    expect(isRevealed).to.equal(false);
    expect(isMintExpired).to.equal(false);

    // constructor
    const tokenIdList = await contract.read.getTokenIdList();
    const addedTokenIds = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n];
    const tokenIdsForDeployer = [147n, 148n, 149n, 150n, 151n];
    expect(tokenIdList).to.deep.equal([
      ...addedTokenIds,
      ...tokenIdsForDeployer,
    ]);
    const isNotWhitelisteds = await Promise.all(
      addedTokenIds.map((tokenId) =>
        contract.read.whitelistList([tokenId]).then((v) => v.toLowerCase())
      )
    );
    expect(isNotWhitelisteds).to.deep.equal(
      Array(addedTokenIds.length).fill(zeroAddress)
    );
    const isWhitelisteds = await Promise.all(
      tokenIdsForDeployer.map((tokenId) =>
        contract.read.whitelistList([tokenId]).then((v) => v.toLowerCase())
      )
    );
    expect(isWhitelisteds).to.deep.equal(
      Array(tokenIdsForDeployer.length).fill(
        owner.account.address.toLowerCase()
      )
    );
  });

  it("mintAuto", async function () {
    const { contract, owner, otherAccounts } = await loadFixture(
      deployWithFixture
    );
    const [other] = otherAccounts;

    await contract.write.addTokenWithReceiverByAnyone(
      [
        {
          tokenId: 21n,
          uri: "21.json",
          user: other.account.address,
        },
      ],
      {
        account: owner.account,
      }
    );
    await contract.write.addTokenWithReceiverByAnyone(
      [
        {
          tokenId: 31n,
          uri: "31.json",
          user: other.account.address,
        },
      ],
      {
        account: owner.account,
      }
    );

    await contract.write.mintAuto({
      account: other.account,
    });
    expect((await contract.read.ownerOf([21n])).toLowerCase()).to.equal(
      other.account.address.toLowerCase()
    );
    await expectRevert(
      () => contract.read.ownerOf([31n]),
      "ERC721NonexistentToken"
    );
    await contract.write.mintAuto({
      account: other.account,
    });
    expect((await contract.read.ownerOf([31n])).toLowerCase()).to.equal(
      other.account.address.toLowerCase()
    );

    await expectRevert(
      () => contract.write.mintAuto({ account: other.account }),
      "NoMintableToken"
    );
  });

  it("addTokenByAnyone", async function () {
    const { contract, otherAccounts } = await loadFixture(deployWithFixture);
    const [otherOne, otherTwo] = otherAccounts;
    const tokenIdLen = await contract.read
      .getTokenIdList()
      .then((v) => v.length);
    await contract.write.addTokenByAnyone([11n, "11.json"], {
      account: otherOne.account,
    });
    await contract.write.addTokenByAnyone([12n, "12.json"], {
      account: otherTwo.account,
    });
    expect(await contract.read.tokenIdList([BigInt(tokenIdLen)])).to.deep.equal(
      11n
    );
    expect(await contract.read.isSettedTokenURI([11n])).to.equal(true);
    expect(
      await contract.read.tokenIdList([BigInt(tokenIdLen + 1)])
    ).to.deep.equal(12n);
    expect(await contract.read.isSettedTokenURI([12n])).to.equal(true);
  });

  it("addWhitelistByAnyone", async function () {
    const { contract, otherAccounts } = await loadFixture(deployWithFixture);
    const [otherOne, otherTwo] = otherAccounts;
    await contract.write.addWhitelistByAnyone([otherOne.account.address, 11n], {
      account: otherOne.account,
    });
    await contract.write.addWhitelistByAnyone([otherTwo.account.address, 12n], {
      account: otherTwo.account,
    });
    expect(await contract.read.whitelistList([11n])).to.deep.equal(
      otherOne.account.address.toLowerCase()
    );
    expect(await contract.read.whitelistList([12n])).to.deep.equal(
      otherTwo.account.address.toLowerCase()
    );
  });

  it("reveal/unreveal", async function () {
    const { contract, otherAccounts } = await loadFixture(deployWithFixture);
    const [otherOne, otherTwo] = otherAccounts;
    expect(await contract.read.isRevealed()).to.equal(false);
    await contract.write.revealByAnyone({
      account: otherOne.account,
    });
    expect(await contract.read.isRevealed()).to.equal(true);
    await contract.write.unrevealByAnyone({
      account: otherTwo.account,
    });
    expect(await contract.read.isRevealed()).to.equal(false);
  });

  it("expireMintAction/unexpireMintAction", async function () {
    const { contract, otherAccounts } = await loadFixture(deployWithFixture);
    const [otherOne, otherTwo] = otherAccounts;
    expect(await contract.read.isMintExpired()).to.equal(false);
    await contract.write.expireMintActionByAnyone({
      account: otherTwo.account,
    });
    expect(await contract.read.isMintExpired()).to.equal(true);
    await contract.write.unexpireMintActionByAnyone({
      account: otherOne.account,
    });
    expect(await contract.read.isMintExpired()).to.equal(false);
  });
});
