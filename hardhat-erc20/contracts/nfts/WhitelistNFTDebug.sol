// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "./WhitelistNFT2.sol";

contract WhitelistNFTDebug is WhitelistNFT2 {
    error NoMintableToken();

    constructor()
        WhitelistNFT2(
            "Whitelist NFT Debug",
            "WHITELIST-NFT-DEBUG",
            "https://raw.githubusercontent.com/linnefromice/sandbox-contracts/refs/heads/main/hardhat-erc20/resources/metadata/",
            "https://raw.githubusercontent.com/linnefromice/sandbox-contracts/refs/heads/main/hardhat-erc20/resources/metadata/hidden.json"
        )
    {
        // NOTE: partially initialized
        addToken(1, "1.json");
        addToken(2, "2.json");
        addToken(3, "3.json");
        addToken(4, "4.json");
        addToken(5, "5.json");
        addToken(6, "6.json");
        addToken(7, "7.json");
        addToken(8, "8.json");
        addToken(9, "9.json");
        //// for deployer
        TokenWithReceiver[] memory tokens = new TokenWithReceiver[](5);
        tokens[0] = TokenWithReceiver(147, "147.json", msg.sender);
        tokens[1] = TokenWithReceiver(148, "148.json", msg.sender);
        tokens[2] = TokenWithReceiver(149, "149.json", msg.sender);
        tokens[3] = TokenWithReceiver(150, "150.json", msg.sender);
        tokens[4] = TokenWithReceiver(151, "151.json", msg.sender);
        bulkAddTokenWithReceiverByAnyone(tokens);
    }

    // Debug functions
    function mintAuto() public {
        for (uint256 i = 0; i < tokenIdList.length; i++) {
            uint256 tokenId = tokenIdList[i];
            address receiver = whitelistList[tokenId];
            if (receiver == msg.sender) {
                if (_ownerOf(tokenId) != address(0)) {
                    continue;
                }
                mint(tokenId);
                return;
            }
        }
        revert NoMintableToken();
    }

    function getTokenIdList() public view override returns (uint256[] memory) {
        return tokenIdList;
    }
    function addTokenByAnyone(uint256 tokenId, string memory uri) public {
        _addToken(tokenId, uri);
    }
    function addWhitelistByAnyone(address user, uint256 tokenId) public {
        _addWhitelist(user, tokenId);
    }
    function addTokenWithReceiverByAnyone(
        TokenWithReceiver memory data
    ) public {
        _addTokenWithReceiver(data);
    }
    function bulkAddTokenWithReceiverByAnyone(
        TokenWithReceiver[] memory data
    ) public {
        for (uint256 i = 0; i < data.length; i++) {
            addTokenWithReceiverByAnyone(data[i]);
        }
    }

    function revealByAnyone() public {
        _setIsRevealed(true);
    }
    function unrevealByAnyone() public {
        _setIsRevealed(false);
    }

    function expireMintActionByAnyone() public {
        _setIsMintExpired(true);
    }
    function unexpireMintActionByAnyone() public {
        _setIsMintExpired(false);
    }
}
