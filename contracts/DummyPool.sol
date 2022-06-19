// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IERC20 {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
}

contract DummyPool {
  IERC20 public token;
  mapping(address => uint256) public balances;

  constructor(address _token) {
    token = IERC20(_token);
  }

  function deposit(uint256 amount) external {
    token.transferFrom(msg.sender, address(this), amount);
    balances[msg.sender] = balances[msg.sender] + amount;
  }

  function claim() external {
    uint256 _balance = balances[msg.sender];
    balances[msg.sender] = 0;
    token.transfer(msg.sender, _balance);
  }

  function claimTwo() external {
    uint256 _balance = balances[msg.sender];
    balances[msg.sender] = 0;
    token.approve(msg.sender, _balance);
    token.transferFrom(address(this), msg.sender, _balance);
  }
}
