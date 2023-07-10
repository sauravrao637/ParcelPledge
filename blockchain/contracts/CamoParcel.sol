// SPDX-License-Identifier: GPL-3.0-only
// Author:- @sauravrao637
pragma solidity ^0.8.10;

contract CamoParcel{
    address owner;
    mapping(address => bool) authorisedShippers;
    mapping(address => bool) authorisedPartners;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyShipper(){
        require(authorisedShippers[msg.sender], "Not a shipper");
        _;
    }

    modifier onlyPartner(){
        require(authorisedPartners[msg.sender], "Not a partner");
        _;
    }
    constructor(){
        owner = msg.sender;

    }
    event ParcelShippedEvent(address, uint);
    event ParcelLocationUpdated(uint);
    event ParcelDelivered(uint);

    uint parcelId = 0;
    struct Parcel{
        uint id;
        address receiver;
        string itemName;
        string itemDesc;
        uint expectedDelivery;
        uint status; //dispatched->0, inTransit -> 1, delivered -> 2, failed ->3
        string currentLocation;
        uint baseCompensation;
        uint otp;
    }

    mapping(address => uint[]) userParcels;
    mapping(uint => Parcel) parcels;

    function addShipper(address shipper) public onlyOwner{
        authorisedShippers[shipper] = true;
    }

    function removeShipper(address shipper) public onlyOwner{
        authorisedShippers[shipper] = false;
    }

    function addPartner(address partner) public onlyOwner{
        authorisedPartners[partner] = true;
    }

    function removePartner(address partner) public onlyOwner{
        authorisedPartners[partner] = false;
    }

    function shipOrder(string memory itemName, string memory itemDesc, address userAddress, uint expectedDelivery, uint baseCompensation, uint otp) public onlyShipper{
        require(expectedDelivery> block.timestamp, "Invalid arguments");

        Parcel memory parcel = Parcel(
            parcelId,
            userAddress,
            itemName,
            itemDesc,
            expectedDelivery,
            0,
            "Dispatched",
            baseCompensation,
            otp
        );
        
        userParcels[userAddress].push(parcelId);
        parcels[parcelId] = parcel;
        
        emit ParcelShippedEvent(userAddress, parcelId);

        parcelId++;
    }

    function updateLocation(uint[] memory pIds, string memory location) public onlyPartner{
        for(uint i=0;i<pIds.length;i++){
            uint pId = pIds[i];    
            require(parcels[pId].status == 0 || parcels[pId].status ==1, "Can't Update location");
            parcels[pId].currentLocation = location;
            parcels[pId].status = 1;
            emit ParcelLocationUpdated(pId);
        }
    }

    function calcCompensation(uint expectedDelivery, uint baseCompensation) private view returns(uint){
        if(expectedDelivery >= block.timestamp) return 0;
        uint difDays = (block.timestamp - expectedDelivery)/(1 days);
        return difDays*baseCompensation;
    }

    function markParcelDelivered(uint pId, uint otp) public onlyPartner returns(uint256) {
        require(otp == parcels[pId].otp, "Invalid");
        require(parcels[pId].status == 0 || parcels[pId].status == 1,"Invalid");
        parcels[pId].currentLocation = "Delivered";
		parcels[pId].status = 2;
		uint compensation = calcCompensation(parcels[pId].expectedDelivery, parcels[pId].baseCompensation);
		if(compensation !=0){
			bool sent = payable(parcels[pId].receiver).send(compensation);
			require(sent, "Failed to compensate");
		}
		emit ParcelDelivered(pId);
		return block.timestamp;
    }

    function viewMyParcels() public view returns (Parcel[] memory) {
        Parcel[] memory myParcels = new Parcel[](userParcels[msg.sender].length);
        for(uint i=0;i< userParcels[msg.sender].length;i++){
            myParcels[i] = parcels[userParcels[msg.sender][i]];
        }
        return myParcels;
    }

    function viewparcel(uint pId) public view onlyShipper returns(Parcel memory){
        return parcels[pId];
    }

    function withdrawFunds() public payable onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function fund() public payable{
        require(msg.value!=0);
    }
}
