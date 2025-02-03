// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistNFT2 is ERC721URIStorage, Ownable {
    error NotInitializedToken(uint256 tokenId);
    error NotWhitelisted(uint256 tokenId);
    error NotReceiver();
    error AlreadyMinted();

    uint256[] public tokenIdList;
    mapping(uint256 => address) public whitelistList;
    mapping(uint256 => bool) public isSettedTokenURI;

    bool public isRevealed = false;
    string public hiddenURI;
    string public revealedBaseURI;

    // TODO: add expiration
    // bool public isExpired = false;

    constructor(
        string memory _revealedBaseURI,
        string memory _hiddenURI
    ) ERC721("WhitelistNFT2", "WHITELIST-NFT-2") Ownable(msg.sender) {
        revealedBaseURI = _revealedBaseURI;
        hiddenURI = _hiddenURI;
    }

    function mint(uint256 tokenId) public {
        address receiver = whitelistList[tokenId];
        if (receiver == address(0)) {
            revert NotWhitelisted(tokenId);
        }
        if (receiver != msg.sender) {
            revert NotReceiver();
        }
        _executeMint(receiver, tokenId);
    }
    function mintByOwner(address to, uint256 tokenId) public onlyOwner {
        _executeMint(to, tokenId);
    }
    function _executeMint(address to, uint256 tokenId) internal {
        if (_ownerOf(tokenId) != address(0)) {
            revert AlreadyMinted();
        }
        if (!isSettedTokenURI[tokenId]) {
            revert NotInitializedToken(tokenId);
        }
        _mint(to, tokenId);
    }

    // functions to view
    function _baseURI() internal view override returns (string memory) {
        // return
        //     "https://raw.githubusercontent.com/linnefromice/sandbox-contracts/refs/heads/main/hardhat-erc20/resources/metadata/";
        return revealedBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (isRevealed) {
            return super.tokenURI(tokenId);
        }
        return hiddenURI;
    }

    // NOTE: for debug
    function getTokenIdList() public view returns (uint256[] memory) {
        return tokenIdList;
    }

    // functions to manage token
    function addToken(uint256 tokenId, string memory uri) public onlyOwner {
        _setTokenURI(tokenId, uri);
        tokenIdList.push(tokenId);
        isSettedTokenURI[tokenId] = true;
    }
    function addWhitelist(address user, uint256 tokenId) public onlyOwner {
        whitelistList[tokenId] = user;
    }
    function reveal() public onlyOwner {
        isRevealed = true;
    }
}
