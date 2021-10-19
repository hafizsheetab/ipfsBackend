// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract RobotNFT is ERC721URIStorage{
    address private owner;
    uint256 public tokenCount = 0;
    constructor(string memory _name, string memory _symbol)  ERC721(_name, _symbol){
        owner = msg.sender;
    }
    function mint(address _to, uint256 _tokenId, string memory _tokenURI) public{
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId,_tokenURI);
    }
    function transfer(address _to, uint256 _tokenId) public{
        _transfer(msg.sender, _to, _tokenId);
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }
    
}