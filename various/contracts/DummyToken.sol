// SPDX-Licence-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyToken is ERC20 {
  constructor() public ERC20("Dummy Token", "DUMMY") {}

  function mint(uint256 value) public returns (bool) {
    _mint(_msgSender(), value);
    return true;
  }
}