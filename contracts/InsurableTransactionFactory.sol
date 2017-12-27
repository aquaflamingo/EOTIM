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

    function create(address counterParty, uint max, uint premium) external {
        require(counterParty!=0x0);
        address newContract = new Transaction(counterParty,max,premium);
        contracts.push(newContract);
        NewContractAddress(newContract,msg.sender);
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