// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ICORepresentative is ERC20 {
    constructor() ERC20("ICORepresentative", "ICO-R") {
        _mint(
            msg.sender,
            2_000_000_000 * (10**uint256(decimals()))
        );
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
