pragma solidity ^0.4.2;

import './Transaction.sol';

contract InsurableTransactionFactory {
    address public owner;
    Transaction[] contracts;


    function InsurableTransactionFactory() {
        owner = msg.sender;
    }
    
    event NewContractAddress (address contractAddress, address contractCreator);
    event ContractDetails(address counterParty, 
        bytes32 name,
        bytes32 desc,
        uint max, 
        uint premium);

    function count() public constant returns (uint theCount) { 
        return contracts.length;
    }

    function create(
        address counterParty, 
        bytes32 name,
        bytes32 desc,
        uint max, 
        uint premium) payable external returns (Transaction newContractAddress) {
        ContractDetails(counterParty,name,desc,max,premium);
        
        require(counterParty!=0x0);
        Transaction newContract = new Transaction(counterParty,name,desc,max,premium);
        contracts.push(newContract);
        newContract.transfer(msg.value);
        NewContractAddress(newContract,msg.sender);
        return newContract;
    }


    // function remove(uint id) public {
    //     require(id<contracts.length);
    //     Transaction trxn = Transaction(contracts[id]);
    //     // if(msg.sender!=trxn.owner()) revert();
    //     // trxn.kill();
    // }

    function getTransactions() public returns (Transaction[] trxns) {
        return contracts;
    }

}