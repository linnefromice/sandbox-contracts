/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ERC20KGLInterface extends ethers.utils.Interface {
  functions: {
    "update_mining_parameters()": FunctionFragment;
    "start_epoch_time_write()": FunctionFragment;
    "future_epoch_time_write()": FunctionFragment;
    "available_supply()": FunctionFragment;
    "mintable_in_timeframe(uint256,uint256)": FunctionFragment;
    "set_minter(address)": FunctionFragment;
    "set_admin(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "set_name(string,string)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "decimals()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "minter()": FunctionFragment;
    "admin()": FunctionFragment;
    "mining_epoch()": FunctionFragment;
    "start_epoch_time()": FunctionFragment;
    "rate()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "update_mining_parameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "start_epoch_time_write",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "future_epoch_time_write",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "available_supply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintable_in_timeframe",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "set_minter", values: [string]): string;
  encodeFunctionData(functionFragment: "set_admin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "set_name",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "minter", values?: undefined): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mining_epoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "start_epoch_time",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rate", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "update_mining_parameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "start_epoch_time_write",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "future_epoch_time_write",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "available_supply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintable_in_timeframe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "set_minter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mining_epoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "start_epoch_time",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rate", data: BytesLike): Result;

  events: {
    "Transfer(address,address,uint256)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "UpdateMiningParameters(uint256,uint256,uint256)": EventFragment;
    "SetMinter(address)": EventFragment;
    "SetAdmin(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateMiningParameters"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMinter"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAdmin"): EventFragment;
}

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & {
    _from: string;
    _to: string;
    _value: BigNumber;
  }
>;

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    _owner: string;
    _spender: string;
    _value: BigNumber;
  }
>;

export type UpdateMiningParametersEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber] & {
    time: BigNumber;
    rate: BigNumber;
    supply: BigNumber;
  }
>;

export type SetMinterEvent = TypedEvent<[string] & { minter: string }>;

export type SetAdminEvent = TypedEvent<[string] & { admin: string }>;

export class ERC20KGL extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ERC20KGLInterface;

  functions: {
    update_mining_parameters(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    start_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    future_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    available_supply(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintable_in_timeframe(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    set_minter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    set_admin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burn(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    set_name(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    decimals(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    minter(overrides?: CallOverrides): Promise<[string]>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    mining_epoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    start_epoch_time(overrides?: CallOverrides): Promise<[BigNumber]>;

    rate(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  update_mining_parameters(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  start_epoch_time_write(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  future_epoch_time_write(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  available_supply(overrides?: CallOverrides): Promise<BigNumber>;

  mintable_in_timeframe(
    start: BigNumberish,
    end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  set_minter(
    _minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  set_admin(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  allowance(
    _owner: string,
    _spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  approve(
    _spender: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mint(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burn(
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  set_name(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  decimals(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  minter(overrides?: CallOverrides): Promise<string>;

  admin(overrides?: CallOverrides): Promise<string>;

  mining_epoch(overrides?: CallOverrides): Promise<BigNumber>;

  start_epoch_time(overrides?: CallOverrides): Promise<BigNumber>;

  rate(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    update_mining_parameters(overrides?: CallOverrides): Promise<void>;

    start_epoch_time_write(overrides?: CallOverrides): Promise<BigNumber>;

    future_epoch_time_write(overrides?: CallOverrides): Promise<BigNumber>;

    available_supply(overrides?: CallOverrides): Promise<BigNumber>;

    mintable_in_timeframe(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    set_minter(_minter: string, overrides?: CallOverrides): Promise<void>;

    set_admin(_admin: string, overrides?: CallOverrides): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    burn(_value: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    set_name(
      _name: string,
      _symbol: string,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    minter(overrides?: CallOverrides): Promise<string>;

    admin(overrides?: CallOverrides): Promise<string>;

    mining_epoch(overrides?: CallOverrides): Promise<BigNumber>;

    start_epoch_time(overrides?: CallOverrides): Promise<BigNumber>;

    rate(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Transfer(address,address,uint256)"(
      _from?: string | null,
      _to?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _from: string; _to: string; _value: BigNumber }
    >;

    Transfer(
      _from?: string | null,
      _to?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _from: string; _to: string; _value: BigNumber }
    >;

    "Approval(address,address,uint256)"(
      _owner?: string | null,
      _spender?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _owner: string; _spender: string; _value: BigNumber }
    >;

    Approval(
      _owner?: string | null,
      _spender?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _owner: string; _spender: string; _value: BigNumber }
    >;

    "UpdateMiningParameters(uint256,uint256,uint256)"(
      time?: null,
      rate?: null,
      supply?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { time: BigNumber; rate: BigNumber; supply: BigNumber }
    >;

    UpdateMiningParameters(
      time?: null,
      rate?: null,
      supply?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { time: BigNumber; rate: BigNumber; supply: BigNumber }
    >;

    "SetMinter(address)"(
      minter?: null
    ): TypedEventFilter<[string], { minter: string }>;

    SetMinter(minter?: null): TypedEventFilter<[string], { minter: string }>;

    "SetAdmin(address)"(
      admin?: null
    ): TypedEventFilter<[string], { admin: string }>;

    SetAdmin(admin?: null): TypedEventFilter<[string], { admin: string }>;
  };

  estimateGas: {
    update_mining_parameters(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    start_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    future_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    available_supply(overrides?: CallOverrides): Promise<BigNumber>;

    mintable_in_timeframe(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    set_minter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    set_admin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burn(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    set_name(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    minter(overrides?: CallOverrides): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    mining_epoch(overrides?: CallOverrides): Promise<BigNumber>;

    start_epoch_time(overrides?: CallOverrides): Promise<BigNumber>;

    rate(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    update_mining_parameters(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    start_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    future_epoch_time_write(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    available_supply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintable_in_timeframe(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    set_minter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    set_admin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burn(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    set_name(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mining_epoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    start_epoch_time(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
