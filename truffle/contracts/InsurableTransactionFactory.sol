pragma solidity 0.5.0;

import "./Transaction.sol";
import "./TransactionRegistry.sol";

contract InsurableTransactionFactory {
    address payable public owner;
    TransactionRegistry internal registry;
    
    constructor(TransactionRegistry _registry) public {
        registry = _registry;
        owner = msg.sender;
    }

    event NewContractCreated (string msg, address contractAddress);

    /// @dev Factory method to create the insurable Transaction contracts
    /// @param counterParty the counter party of the Transaction contract
    /// @param name the name of Transaction contract
    /// @param max the maximum desired insurance coverage (%) for the Transaction contract
    /// @param desc the description for the Transaction contract
    /// @param premium the agreed upon premium (%) to pay out to insurers of the Transaction contract
    /// @return newContractAddress: the new Transaction address
    function create(
        address payable counterParty, 
        bytes32 name,
        uint max,
        bytes32 desc,
        uint premium)external payable returns (Transaction newContractAddress) {
    
        require(counterParty!=address(0), "Counterparty cannot be null");
        
        Transaction newContract = new Transaction(counterParty,name,desc,max,premium,msg.sender,uint(msg.value));
        
        registry.registerOwnership(address(newContract),msg.sender);
        
        address(newContract).transfer(msg.value);
        emit NewContractCreated("Contract created successfully.", address(newContract));
        return newContract;
    }

}