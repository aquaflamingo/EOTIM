pragma solidity ^0.4.2;

import './Transaction.sol';

contract InsurableTransactionFactory {
    address public owner;
    address[] contracts;


    function InsurableTransactionFactory() {
        owner = msg.sender;
    }
    
    event NewContractAddress (address contractAddress, address contractCreator);


    function count() public constant returns (uint theCount) { 
        return contracts.length;
    }

    function create(
        address counterParty, 
        string name,
        string desc,
        uint max, 
        uint premium) payable external returns (address newContractAddress) {
            
        require(counterParty!=0x0);
        address newContract = new Transaction(counterParty,name,desc,max,premium);
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

    function getTransactions() public returns (address[] trxns) {
        return contracts;
    }

}