// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract TNCasino is ERC721, Ownable {
    using Counters for Counters.Counter;

    // counter for the token ids
    Counters.Counter private _tokenIdCounter;
    // the mint price
    uint256 public constant MINT_PRICE = 0.1 ether;
    // the maximum number of tokens that can be created
    uint256 public immutable MAX_TOKENS;

    // the base uri folder where the tokens metadata can be found
    string private baseURI;
    // 
    bool public isPublicSale = false;
    // the root hash of the merkle tree of the whitelisted addresses
    bytes32 public merkleRoot;
    // mapping to check if the whitelisted addressese claimed their tokens
    mapping(address => bool) public whitelistClaimed;

    constructor(uint256 _maxTokens) ERC721("TNCasino", "TNC") {
        MAX_TOKENS = _maxTokens;
        _tokenIdCounter.increment(); // start id from 1
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

    function safeMint(bytes32[] calldata _merkleProof) external payable {
        // requires !!
        require(tx.origin == msg.sender, "Only EOA");
        require(msg.value == MINT_PRICE, "Mint price not met");
        if (!isPublicSale) {
            // check if the user already claimed the token
            require(!whitelistClaimed[msg.sender], "You have already claimed your whitelist");

            // check if the user is in whitelisted
            bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
            require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "KYC check failed");

            // mark that the user has claimed the token in kyc
            whitelistClaimed[msg.sender] = true;
        } 
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_TOKENS, "Max tokens reached");
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json")
            );
    }
}
