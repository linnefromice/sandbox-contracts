import * as dotenv from "dotenv";
import { ContractTypesMap, HardhatRuntimeEnvironment } from "hardhat/types";
import { privateKeyToAccount } from "viem/accounts";
dotenv.config();

const CONTRACT_ADDRESS: { [key: number]: string } = {
  11155111: "0x4dcC1D48613B106988f141deF6BC9D42DA674671",
};

task("check:WhitelistNFT3", "check:WhitelistNFT3").setAction(
  async ({}: {}, hre: HardhatRuntimeEnvironment) => {
    const viem = hre.viem;

    const publicClient = await viem.getPublicClient();
    const chainId = await publicClient.getChainId();
    console.log(chainId);
    const contractAddress = CONTRACT_ADDRESS[chainId];
    if (!contractAddress) {
      throw new Error(`Contract address not found for chainId: ${chainId}`);
    }
    const contract: ContractTypesMap["WhitelistNFTDebug"] =
      await viem.getContractAt(
        "WhitelistNFTDebug",
        contractAddress,
        publicClient
      );
    const [name, symbol, owner, isRevealed, isMintExpired] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.owner(),
      contract.read.isRevealed(),
      contract.read.isMintExpired(),
    ]);
    console.log(`name: ${name}`);
    console.log(`symbol: ${symbol}`);
    console.log(`owner: ${owner}`);
    console.log(`isRevealed: ${isRevealed}`);
    console.log(`isMintExpired: ${isMintExpired}`);

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("PRIVATE_KEY is not set");
    }
    const account = privateKeyToAccount(`0x${privateKey}`);
    console.log(`account by private key:`);
    console.log(JSON.stringify(account));
  }
);
