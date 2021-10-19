// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract FungibleToken is ERC20{
    address owner;
    constructor(string memory _name, string memory _symbol)  ERC20(_name, _symbol){
        owner = msg.sender;
    }
    function mint(address _to, uint _amount) public {
        require(msg.sender == owner, "Owner Needed");
        _mint(_to, _amount);
    }
    function burn(uint _amount) public {
        require(msg.sender == owner, "Owner Needed");
        _burn(msg.sender, _amount);
    }
}