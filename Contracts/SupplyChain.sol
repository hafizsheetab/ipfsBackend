// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;


//cid is the content identifier of the product that is posted on IPFS which is a string type variable
//every cid is mapped to 5 things.   1. Its Status(Status)   2. Owner of the product(address)   3. The WareHouse Responsible For Shipping(address)   4. The Delivery Man Responsible for delivery(address)    5. The Receiver of the Product(address)
//It contains 5 modifiers for integrity constraint
//The Status is an enum Type which speaks for itself
contract SupplyChain {
    mapping (string => Status) public productStatus;
    mapping (string => address) public productOwner;
    mapping (string => address) public productWareHouse;
    mapping (string => address) public productDeliveryMan;
    mapping (string => address) public productReceiver;
    enum Status { NotReadyForSale, ReadyForSale, ShippedToWareHouse, ReceivedByWareHouse, ReadyForDelivery, PickedUpForDelivery, Received }
    address owner;
    event StatusChanged(
        address changer,
        string cid,
        Status from,
        Status to
        );
    constructor(){
        owner = msg.sender;
    }
    modifier isProductOwner(string memory _cid, address _address){
        require(productOwner[_cid] == _address, "Not the Product Owner");
        _;
    }
    modifier isProductWareHouse(string memory _cid, address _address){
        require(productWareHouse[_cid] == _address, "Not the Product Warehouse");
        _;
    }
    modifier isProductDeliveryMan(string memory _cid, address _address){
        require(productDeliveryMan[_cid] == _address, "Not the Product Delivery Man");
        _;
    }
    modifier isProductReceiever(string memory _cid, address _address){
        require(productReceiver[_cid] == _address, "Not the Product Receiver");
        _;
    }
    
    
    
    function addProduct(string memory _cid) public{
        require(productStatus[_cid] == Status.NotReadyForSale, "Product Already Exists");
        Status status = Status.ReadyForSale;
        productStatus[_cid] = status;
        productOwner[_cid] = msg.sender;
        emit StatusChanged(msg.sender, _cid, Status.ReadyForSale, status);
    }
    
    function shipToWareHouse(string memory _cid, address _wareHouse) public isProductOwner(_cid, msg.sender){
        require(productStatus[_cid] == Status.ReadyForSale, "Product Doesnt Exist");
        productWareHouse[_cid] = _wareHouse;
        _changeProductStatus(msg.sender, _cid, Status.ShippedToWareHouse);
    }
    function receiveByWareHouse(string memory _cid) public isProductWareHouse(_cid, msg.sender){
        require(productStatus[_cid] == Status.ShippedToWareHouse, "Cannot Recieve A product that is not shipped Yet");
        _changeProductStatus(msg.sender, _cid, Status.ReceivedByWareHouse);
        
    }
    function makeReadyForDelivery(string memory _cid, address _pickUpMan, address _receiver) public isProductWareHouse(_cid, msg.sender){
        require(productStatus[_cid] == Status.ReceivedByWareHouse, "Product Not Available For Delivery");
        productDeliveryMan[_cid] = _pickUpMan;
        productReceiver[_cid] = _receiver;
        _changeProductStatus(msg.sender, _cid, Status.ReadyForDelivery);
    }
    function pickUpProduct(string memory _cid) public isProductDeliveryMan(_cid, msg.sender){
        require(productStatus[_cid] == Status.ReadyForDelivery, "Product Not Available For Pick Up");
        _changeProductStatus(msg.sender, _cid, Status.PickedUpForDelivery);
    }
    function receiveByReceiver(string memory _cid) public isProductReceiever(_cid, msg.sender){
        require(productStatus[_cid] == Status.PickedUpForDelivery, "Product Not Available to Receive");
        _changeProductStatus(msg.sender, _cid, Status.Received);
    }
    
    function _changeProductStatus(address _msgSender, string memory _cid,  Status _status) internal{
        emit StatusChanged(_msgSender, _cid, productStatus[_cid], _status);
        productStatus[_cid] = _status;
    }
    
}