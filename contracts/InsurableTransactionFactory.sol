pragma solidity ^0.4.2;

import "./Transaction.sol";

contract InsurableTransactionFactory {
    address public owner;
    mapping(address => uint[]) contractsOwned;
    Transaction[] contracts;


    function InsurableTransactionFactory() {
        owner = msg.sender;
    }
    
    
    event NewContractAddress (address contractAddress, address contractCreator);


    function count() public constant returns (uint theCount) { 
        return contracts.length;
    }

    function create(
        address counterParty, 
        bytes32 name,
        uint max,
        bytes32 desc,
        uint premium) payable external returns (Transaction newContractAddress) {
    
        require(counterParty!=0x0);

        Transaction newContract = new Transaction(counterParty,name,desc,max,premium);

        contracts.push(newContract);
        uint id = contracts.length - 1; 
        contractsOwned[msg.sender].push(id);

        newContract.transfer(msg.value);

        return newContract;
    }

    function getTransactions() public returns (Transaction[] trxns) {
        return contracts;
    }

    function getAllInsuredTransactions(address ownerAddress) public returns (Transaction[] trxns) {
        uint[] ids = contractsOwned[ownerAddress];
        
        Transaction[] trx;
        
        for (uint counter=0;counter<ids.length;counter++) {
            trx.push(contracts[ids[counter]]);
        }

        return trx;
    }

}