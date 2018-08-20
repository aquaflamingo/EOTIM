pragma solidity ^0.4.2;

import "./Transaction.sol";

contract InsurableTransactionFactory {
    address public owner;
    mapping(address => address[]) contractsOwned;
    address[] contracts;


    constructor()  public {
        owner = msg.sender;
    
    }

    event NewContractCreated (string msg, address contractAddress);


    /// @dev A lookup method for finding all contracts currently owned by parameter `address`
    /// @param _address address to lookup
    /// @return contracts an array of contracts owned by the user with parameter `address` in this factory
    function getContractsOwnedBy(address _address) public view returns (address[] _contracts) {
        return contractsOwned[_address];
    }

    /// @dev counts number of contracts currently in the factory
    /// @return _count: count of contracts currently in the factory
    function count() public view returns (uint _count) { 
        return contractsOwned[msg.sender].length;
    }

    /// @dev Factory method to create the insurable Transaction contracts
    /// @param counterParty the counter party of the Transaction contract
    /// @param name the name of Transaction contract
    /// @param max the maximum desired insurance coverage (%) for the Transaction contract
    /// @param desc the description for the Transaction contract
    /// @param premium the agreed upon premium (%) to pay out to insurers of the Transaction contract
    /// @return newContractAddress: the new Transaction address
    function create(
        address counterParty, 
        bytes32 name,
        uint max,
        bytes32 desc,
        uint premium)external payable returns (Transaction newContractAddress) {
    
        require(counterParty!=0x0, "Counterparty cannot be null");
        
        Transaction newContract = new Transaction(counterParty,name,desc,max,premium,msg.sender,uint(msg.value));
        contracts.push(newContract);
        contractsOwned[msg.sender].push(newContract);
        address(newContract).transfer(msg.value);
        emit NewContractCreated("Contract created successfully.", newContract);
        return newContract;
    }

    /// @dev getter for all Transaction contracts
    /// @return trxns An array of Transaction structs
    function getTransactions() public view returns (address[] trxns) {
        return contracts;
    }
    /// @dev returns the balance of the factory contract
    /// @return _balance 
    function getBalance() public view returns (uint _balance) {
        return address(this).balance;
    }

}