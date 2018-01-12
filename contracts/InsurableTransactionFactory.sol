pragma solidity ^0.4.2;

import './Transaction.sol';

contract InsurableTransactionFactory {
    address public owner;
    mapping(address => uint[]) owners;
    Transaction[] contracts;


    function InsurableTransactionFactory() {
        owner = msg.sender;
    }
    
    event NewContractAddress (address contractAddress, address contractCreator);
    event ContractDetails(address counterParty, 
        bytes32 name,
        uint max,
        bytes32 desc,
        uint premium);

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
        owners[msg.sender].push(id);
        newContract.transfer(msg.value);

        ContractDetails(newContract.counterParty(),newContract.name(),max,newContract.desc(),newContract.premium());

        NewContractAddress(newContract,msg.sender);
        return newContract;
    }

    function getTransactions() public returns (Transaction[] trxns) {
        return contracts;
    }

    function get(uint[] _ids) returns (Transaction[] trxns) {
        require(_ids.length>0);
        Transaction[] t;

        // Iterate through array values
        for (uint i=0;i<_ids.length;i++) {
            // Can't be outside range
            require(_ids[i]<contracts.length);

            t.push(contracts[_ids[i]]);
        }

        return t;
    }

    function getOwnerTransactions(address _owner) returns (Transaction[] trxns) {
        return get(owners[_owner]);
    }

}