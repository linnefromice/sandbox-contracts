/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20KGL, ERC20KGLInterface } from "../ERC20KGL";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        name: "rate",
        type: "uint256",
      },
      {
        indexed: false,
        name: "supply",
        type: "uint256",
      },
    ],
    name: "UpdateMiningParameters",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "minter",
        type: "address",
      },
    ],
    name: "SetMinter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "admin",
        type: "address",
      },
    ],
    name: "SetAdmin",
    type: "event",
  },
  {
    inputs: [
      {
        name: "_name",
        type: "string",
      },
      {
        name: "_symbol",
        type: "string",
      },
      {
        name: "_decimals",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "update_mining_parameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "start_epoch_time_write",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "future_epoch_time_write",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "available_supply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "start",
        type: "uint256",
      },
      {
        name: "end",
        type: "uint256",
      },
    ],
    name: "mintable_in_timeframe",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_minter",
        type: "address",
      },
    ],
    name: "set_minter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_admin",
        type: "address",
      },
    ],
    name: "set_admin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_name",
        type: "string",
      },
      {
        name: "_symbol",
        type: "string",
      },
    ],
    name: "set_name",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mining_epoch",
    outputs: [
      {
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "start_epoch_time",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05260606113256101403934156100a157600080fd5b6060602061132560c03960c051611325016101a0396040602061132560c03960c0516004013511156100d257600080fd5b6040602060206113250160c03960c05161132501610220396020602060206113250160c03960c05160040135111561010957600080fd5b64010c388d00604e610180511061011f57600080fd5b61018051600a0a808202821582848304141761013a57600080fd5b80905090509050610280526101a080600060c052602060c020602082510161012060006003818352015b8261012051602002111561017757610199565b61012051602002850151610120518501555b8151600101808352811415610164575b50505050505061022080600160c052602060c020602082510161012060006002818352015b826101205160200211156101d1576101f3565b61012051602002850151610120518501555b81516001018083528114156101be575b505050505050610180516002556102805160033360e05260c052604060c020556102805160055533600755610280516102a0523360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206102a0a342600081818301101561026257600080fd5b8082019050905063096601808082101561027b57600080fd5b808203905090506009557fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6008556000600a5561028051600b5561130d56600436101561000d5761104d565b600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a0526000156101c4575b61014052600a5461016052600b54610180526009805463096601808181830110156100d357600080fd5b80820190509050815550600880546001606051818301806040519013156100f957600080fd5b809190121561010757600080fd5b9050905081555061016051151561012b576801e41164957b32f9a26101605261017b565b6101808051610160516309660180808202821582848304141761014d57600080fd5b8090509050905081818301101561016357600080fd5b8082019050905081525061018051600b556001610160525b61016051600a55426101a052610160516101c052610180516101e0527f27e46362a1e6129b6dd539c984ce739291a97128dfcaeca1255e8ac83abd944160606101a0a161014051565b63d43b40fa60005114156102155734156101dd57600080fd5b60095463096601808181830110156101f457600080fd5b8082019050905042101561020757600080fd5b600658016100a9565b600050005b63adc4cf43600051141561029157341561022e57600080fd5b6009546101405261014051630966018081818301101561024d57600080fd5b80820190509050421015156102815761014051600658016100a9565b6101405260005060095460005260206000f35061028f565b6101405160005260206000f3505b005b63b26b238e60005114156103435734156102aa57600080fd5b600954610140526101405163096601808181830110156102c957600080fd5b80820190509050421015156103185761014051600658016100a9565b61014052600050600954630966018081818301101561030357600080fd5b8082019050905060005260206000f350610341565b61014051630966018081818301101561033057600080fd5b8082019050905060005260206000f3505b005b6000156103ac575b61014052600b54426009548082101561036357600080fd5b80820390509050600a54808202821582848304141761038157600080fd5b8090509050905081818301101561039757600080fd5b80820190509050600052600051610140515650005b6324f92a2560005114156103e15734156103c557600080fd5b6006580161034b565b610140526101405160005260206000f350005b63d725a9ca600051141561062e5734156103fa57600080fd5b602435600435111561040b57600080fd5b60006101405260095461016052600a546101805261016051630966018081818301101561043757600080fd5b808201905090506024351115610471576101608051630966018081818301101561046057600080fd5b808201905090508152506001610180525b61016051630966018081818301101561048957600080fd5b80820190509050602435111561049e57600080fd5b6101a060006103e7818352015b610160516024351015156105cc576024356101c0526101605163096601808181830110156104d857600080fd5b808201905090506101c051111561050d5761016051630966018081818301101561050157600080fd5b808201905090506101c0525b6004356101e05261016051630966018081818301101561052c57600080fd5b808201905090506101e0511015156105475761061d5661055f565b610160516101e051101561055e57610160516101e0525b5b6101408051610180516101c0516101e0518082101561057d57600080fd5b80820390509050808202821582848304141761059857600080fd5b809050905090508181830110156105ae57600080fd5b80820190509050815250610160516004351015156105cb5761061d565b5b61016080516309660180808210156105e357600080fd5b808203905090508152506001610180526801e41164957b32f9a261018051111561060c57600080fd5b5b81516001018083528114156104ab575b50506101405160005260206000f350005b631652e9fc60005114156106aa57341561064757600080fd5b600435602051811061065857600080fd5b50600754331461066757600080fd5b6006541561067457600080fd5b600435600655600435610140527fcec52196e972044edde8689a1b608e459c5946b7f3e5c8cd3d6d8e126d422e1c6020610140a1005b63e9333fab60005114156107195734156106c357600080fd5b60043560205181106106d457600080fd5b5060075433146106e357600080fd5b600435600755600435610140527f5a272403b402d892977df56625f4164ccaf70ca3863991c43ecfe76a6905b0a16020610140a1005b6318160ddd600051141561074057341561073257600080fd5b60055460005260206000f350005b63dd62ed3e60005114156107a757341561075957600080fd5b600435602051811061076a57600080fd5b50602435602051811061077c57600080fd5b50600460043560e05260c052604060c02060243560e05260c052604060c0205460005260206000f350005b63a9059cbb60005114156108785734156107c057600080fd5b60043560205181106107d157600080fd5b506000600435186107e157600080fd5b60033360e05260c052604060c02080546024358082101561080157600080fd5b80820390509050815550600360043560e05260c052604060c020805460243581818301101561082f57600080fd5b8082019050905081555060243561014052600435337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6020610140a3600160005260206000f350005b6323b872dd600051141561099757341561089157600080fd5b60043560205181106108a257600080fd5b5060243560205181106108b457600080fd5b506000602435186108c457600080fd5b600360043560e05260c052604060c0208054604435808210156108e657600080fd5b80820390509050815550600360243560e05260c052604060c020805460443581818301101561091457600080fd5b80820190509050815550600460043560e05260c052604060c0203360e05260c052604060c02080546044358082101561094c57600080fd5b80820390509050815550604435610140526024356004357fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6020610140a3600160005260206000f350005b63095ea7b36000511415610a5a5734156109b057600080fd5b60043560205181106109c157600080fd5b5060243515156109d25760016109f1565b60043360e05260c052604060c02060043560e05260c052604060c02054155b5b6109fb57600080fd5b60243560043360e05260c052604060c02060043560e05260c052604060c0205560243561014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f350005b6340c10f196000511415610b92573415610a7357600080fd5b6004356020518110610a8457600080fd5b506006543314610a9357600080fd5b600060043518610aa257600080fd5b6009546309660180818183011015610ab957600080fd5b8082019050905042101515610ad557600658016100a9565b6000505b600554602435818183011015610aea57600080fd5b8082019050905061014052610140516006580161034b565b610180526101405261018051610140511115610b1d57600080fd5b61014051600555600360043560e05260c052604060c0208054602435818183011015610b4857600080fd5b808201905090508155506024356101a05260043560007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101a0a3600160005260206000f350005b6342966c686000511415610c31573415610bab57600080fd5b60033360e05260c052604060c020805460043580821015610bcb57600080fd5b808203905090508155506005805460043580821015610be957600080fd5b80820390509050815550600435610140526000337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6020610140a3600160005260206000f350005b63e1430e066000511415610db3573415610c4a57600080fd5b6060600435600401610140376040600435600401351115610c6a57600080fd5b60406024356004016101c0376020602435600401351115610c8a57600080fd5b6308c379a0610220526020610240526024610260527f4f6e6c792061646d696e20697320616c6c6f77656420746f206368616e676520610280527f6e616d65000000000000000000000000000000000000000000000000000000006102a052610260506007543314610cfd57608461023cfd5b61014080600060c052602060c020602082510161012060006003818352015b82610120516020021115610d2f57610d51565b61012051602002850151610120518501555b8151600101808352811415610d1c575b5050505050506101c080600160c052602060c020602082510161012060006002818352015b82610120516020021115610d8957610dab565b61012051602002850151610120518501555b8151600101808352811415610d76575b505050505050005b6306fdde036000511415610e67573415610dcc57600080fd5b60008060c052602060c020610180602082540161012060006003818352015b82610120516020021115610dfe57610e20565b61012051850154610120516020028501525b8151600101808352811415610deb575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f350005b6395d89b416000511415610f1b573415610e8057600080fd5b60018060c052602060c020610180602082540161012060006002818352015b82610120516020021115610eb257610ed4565b61012051850154610120516020028501525b8151600101808352811415610e9f575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f350005b63313ce5676000511415610f42573415610f3457600080fd5b60025460005260206000f350005b6370a082316000511415610f89573415610f5b57600080fd5b6004356020518110610f6c57600080fd5b50600360043560e05260c052604060c0205460005260206000f350005b63075461726000511415610fb0573415610fa257600080fd5b60065460005260206000f350005b63f851a4406000511415610fd7573415610fc957600080fd5b60075460005260206000f350005b63f9a40bf66000511415610ffe573415610ff057600080fd5b60085460005260206000f350005b637375be26600051141561102557341561101757600080fd5b60095460005260206000f350005b632c4e722e600051141561104c57341561103e57600080fd5b600a5460005260206000f350005b5b60006000fd5b6102ba61130d036102ba6000396102ba61130d036000f3";

export class ERC20KGL__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20KGL> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      overrides || {}
    ) as Promise<ERC20KGL>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      overrides || {}
    );
  }
  attach(address: string): ERC20KGL {
    return super.attach(address) as ERC20KGL;
  }
  connect(signer: Signer): ERC20KGL__factory {
    return super.connect(signer) as ERC20KGL__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20KGLInterface {
    return new utils.Interface(_abi) as ERC20KGLInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20KGL {
    return new Contract(address, _abi, signerOrProvider) as ERC20KGL;
  }
}