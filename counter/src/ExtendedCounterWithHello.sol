// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ExtendedCounterWithHello {
    uint256 public number;

    constructor() {
        number = 0;
    }

    function add(uint256 val) public {
        number += val;
    }

    function sub(uint256 val) public {
        number -= val;
    }

    function mul(uint256 val) public {
        number *= val;
    }

    function div(uint256 val) public {
        number /= val;
    }

    function hello() public pure returns (string memory) {
        return "Hello, World!";
    }
}
