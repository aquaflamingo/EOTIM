pragma solidity ^0.4.2;

import "./Transaction.sol";

contract InsurableTransactionFactory {
    address public owner;
    mapping(address => address[]) contractsOwned;
    Transaction[] contracts;


    constructor()  public {
        owner = msg.sender;
    
    }

    event NewContractAddress (address contractAddress, address contractCreator);


    function getContractIdsOwnedBy(address _address) public returns (address[] _ids) {
        return contractsOwned[_address];
    }

    
    function count() public constant returns (uint theCount) { 
        return contractsOwned[msg.sender].length;
    }

    function create(
        address counterParty, 
        bytes32 name,
        uint max,
        bytes32 desc,
        uint premium) payable external returns (Transaction newContractAddress) {
    
        require(counterParty!=0x0, "Counterparty cannot be null");

        Transaction newContract = new Transaction(counterParty,name,desc,max,premium,msg.sender,uint(msg.value));

        contracts.push(newContract);
        contractsOwned[msg.sender].push(newContract);
        address(newContract).transfer(msg.value);

        return newContract;
    }

    function getTransactions() public view returns (Transaction[] trxns) {
        return contracts;
    }



}