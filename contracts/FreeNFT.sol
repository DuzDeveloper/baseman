// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title FreeNFT
 * @dev Contrato NFT simple que permite mintear gratis
 * 
 * IMPORTANTE: Este contrato debe ser desplegado en Base Sepolia (testnet) o Base Mainnet
 * Para desplegar:
 * 1. Usa Remix IDE (remix.ethereum.org)
 * 2. Compila el contrato
 * 3. Conecta tu wallet (MetaMask) a Base Sepolia
 * 4. Despliega el contrato con los parámetros del constructor
 */
contract FreeNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;
    string private _baseTokenURI;
    uint256 public maxSupply;
    
    mapping(address => bool) public hasMinted;

    event NFTMinted(address indexed to, uint256 tokenId);

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        uint256 _maxSupply
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
        maxSupply = _maxSupply;
    }

    /**
     * @dev Permite a cualquier usuario mintear UN NFT gratis
     */
    function mint() public {
        require(_nextTokenId < maxSupply, "Max supply reached");
        require(!hasMinted[msg.sender], "You already minted");
        
        uint256 tokenId = _nextTokenId++;
        hasMinted[msg.sender] = true;
        
        _safeMint(msg.sender, tokenId);
        
        emit NFTMinted(msg.sender, tokenId);
    }

    /**
     * @dev Override para agregar la base URI a los tokens
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Retorna el URI del token
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : "";
    }

    /**
     * @dev Permite al owner actualizar la base URI
     */
    function setBaseURI(string memory baseTokenURI) public onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    /**
     * @dev Retorna el total de NFTs minteados
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }
}
