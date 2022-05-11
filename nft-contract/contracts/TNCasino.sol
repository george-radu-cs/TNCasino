// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract TNCasino is ERC721A, Ownable {
    // the mint price
    uint256 public constant MINT_PRICE = 0.1 ether;
    // the maximum number of tokens that can be created
    uint256 public immutable MAX_TOKENS;
    // the number of tokens minted
    uint256 public tokensMinted;

    // the base uri folder where the tokens metadata can be found
    string public baseURI;
    // marker for public sale
    bool public isPublicSale = false;
    // the root hash of the merkle tree of the whitelisted addresses
    bytes32 public merkleRoot;
    // mapping to check if the whitelisted addressese claimed their tokens
    mapping(address => uint256) public whitelistClaimed;
    // the maximum tokens allower for mint per whitelist
    uint256 public immutable MAX_TOKENS_PER_WHITELIST;

    constructor(uint256 _maxTokens, uint256 _maxTokenPerWhitelist)
        ERC721A("TNCasino", "TNC")
    {
        MAX_TOKENS = _maxTokens;
        MAX_TOKENS_PER_WHITELIST = _maxTokenPerWhitelist;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _uri) external onlyOwner {
        baseURI = _uri;
    }

    function setIsPublicSale(bool _isPublicSale) external onlyOwner {
        isPublicSale = _isPublicSale;
    }

    function setWhitelistMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function safeMint(uint256 quantity, bytes32[] calldata _merkleProof)
        external
        payable
    {
        require(tx.origin == msg.sender, "Only EOA");
        require(msg.value == MINT_PRICE, "Mint price not met");
        require(tokensMinted + quantity <= MAX_TOKENS, "Max tokens reached");
        if (!isPublicSale) {
            // check if the user already claimed the token
            require(
                whitelistClaimed[msg.sender] + quantity <=
                    MAX_TOKENS_PER_WHITELIST,
                "You have already claimed your whitelist"
            );

            // check if the user is in whitelisted
            bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
            require(
                MerkleProof.verify(_merkleProof, merkleRoot, leaf),
                "KYC check failed"
            );

            // mark that the user has claimed the token in kyc
            whitelistClaimed[msg.sender] += quantity;
        }
        tokensMinted += quantity;
        _safeMint(msg.sender, quantity);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId)));
    }
}
