// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CapsuleNFT is ERC721, Ownable {
    mapping(address => uint256) public whitelist;
    uint256[] public tokenIds;

    constructor() ERC721("CapsuleNFT", "CAPSULE-NFT") Ownable(msg.sender) {}

    function mint() public {
        uint256 tokenId = whitelist[msg.sender];
        require(tokenId != 0, "Not whitelisted");
        // todo: check if tokenId is already minted

        _mint(msg.sender, tokenId);
    }

    function addWhitelist(address user, uint256 tokenId) public onlyOwner {
        // todo: check if tokenId is already in whitelist
        // todo: check if tokenId is already minted
        whitelist[user] = tokenId;
        tokenIds.push(tokenId);
    }

    function recovery(uint256 tokenId) public onlyOwner {
        // todo: check if tokenId is minted
        _mint(msg.sender, tokenId);
    }
}
