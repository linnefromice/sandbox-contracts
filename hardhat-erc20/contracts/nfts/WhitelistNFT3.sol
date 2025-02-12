// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// NOTE: update WhitelistNFT2.sol to WhitelistNFT3.sol
// - 1 address has 1 tokenId
//   - whitelistList is mapping(address => uint256)

contract WhitelistNFT3 is ERC721URIStorage, Ownable {
    error NotInitializedToken(uint256 tokenId);
    error AlreadyWhitelisted(address user);
    error NotWhitelisted(address user);
    error AlreadyMinted();
    error MintExpired();

    uint256[] public tokenIdList;
    mapping(address => uint256) public whitelistList;
    mapping(uint256 => bool) public isSettedTokenURI;

    bool public isRevealed = false;
    string public hiddenURI;
    string public revealedBaseURI;
    bool public isMintExpired = false;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _revealedBaseURI,
        string memory _hiddenURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        revealedBaseURI = _revealedBaseURI;
        hiddenURI = _hiddenURI;
    }

    function mint() public {
        address receiver = msg.sender;
        uint256 tokenId = whitelistList[receiver];
        if (tokenId == 0) {
            revert NotWhitelisted(receiver);
        }
        if (isMintExpired) {
            revert MintExpired();
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

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (isRevealed) {
            return super.tokenURI(tokenId);
        }
        return hiddenURI;
    }

    // functions to manage token
    function getTokenIdList()
        public
        view
        virtual
        onlyOwner
        returns (uint256[] memory)
    {
        return tokenIdList;
    }

    //// function to register token/whitelist
    struct TokenInfo {
        uint256 tokenId;
        string uri;
    }
    function addToken(TokenInfo memory data) public onlyOwner {
        _addToken(data.tokenId, data.uri);
    }
    function bulkAddToken(TokenInfo[] memory data) public onlyOwner {
        for (uint256 i = 0; i < data.length; i++) {
            _addToken(data[i].tokenId, data[i].uri);
        }
    }
    struct WhitelistInfo {
        address user;
        uint256 tokenId;
    }
    function addWhitelist(WhitelistInfo memory data) public onlyOwner {
        _addWhitelist(data.user, data.tokenId);
    }
    function bulkAddWhitelist(WhitelistInfo[] memory data) public onlyOwner {
        for (uint256 i = 0; i < data.length; i++) {
            _addWhitelist(data[i].user, data[i].tokenId);
        }
    }

    struct TokenWithReceiver {
        uint256 tokenId;
        string uri;
        address user;
    }
    ////// NOTE: use this function or above functions in production
    function addTokenWithReceiver(
        TokenWithReceiver memory data
    ) public onlyOwner {
        _addTokenWithReceiver(data);
    }
    function bulkAddTokenWithReceiver(
        TokenWithReceiver[] memory data
    ) public onlyOwner {
        for (uint256 i = 0; i < data.length; i++) {
            _addTokenWithReceiver(data[i]);
        }
    }

    function reveal() public onlyOwner {
        _setIsRevealed(true);
    }
    function expireMintAction() public onlyOwner {
        _setIsMintExpired(true);
    }

    function _addToken(uint256 tokenId, string memory uri) internal {
        _setTokenURI(tokenId, uri);
        tokenIdList.push(tokenId);
        isSettedTokenURI[tokenId] = true;
    }
    function _addWhitelist(address user, uint256 tokenId) internal {
        if (whitelistList[user] != 0) {
            revert AlreadyWhitelisted(user);
        }
        whitelistList[user] = tokenId;
    }
    function _addTokenWithReceiver(TokenWithReceiver memory data) internal {
        _addToken(data.tokenId, data.uri);
        _addWhitelist(data.user, data.tokenId);
    }
    function _setIsRevealed(bool _isRevealed) internal {
        isRevealed = _isRevealed;
    }
    function _setIsMintExpired(bool _isMintExpired) internal {
        isMintExpired = _isMintExpired;
    }
}
