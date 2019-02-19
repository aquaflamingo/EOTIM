pragma solidity 0.5.0;


import "./Transaction.sol";

contract TransactionRegistry {

    address payable public owner;
    TransactionRegistry internal registry;
    mapping(address => address[]) contractsInsuredBy;
    mapping(address => address[]) contractsOwned;
    address[] contracts;


   /// @dev getter for all Transaction contracts
    /// @return trxns An array of Transaction structs
    function getTransactions() public view returns (address[] memory trxns) {
        return contracts;
    }
    
    /// @dev counts number of contracts currently in the factory
    /// @return _count: count of contracts currently in the factory
    function count() public view returns (uint _count) { 
        return contracts.length;
    }
       
    /// @dev constructor
    constructor() public {
        owner = msg.sender;
    }


    /// @dev Registration method for new insured contracts
    /// @param _transactionAddress address of the transaction
    /// @param _insurer address of proposed insurer
    function registerInsurer(address payable _transactionAddress, address payable _insurer) public {
        Transaction trxnInsurer = Transaction(_transactionAddress);
        require(address(trxnInsurer.insurer) == _insurer, "Transaction is not insured by proposed registry insurer");
        contractsInsuredBy[_transactionAddress].push(_insurer);

    }

    /// @dev Registration method for new owned contracts
    /// @param _transactionAddress address of the transaction
    /// @param _owner address of proposed owner
    function registerOwnership(address payable _transactionAddress, address payable _owner) public {
        Transaction trxnOwner = Transaction(_transactionAddress);
        require(address(trxnOwner.owner) == _owner, "Transaction is not owned by proposed registry owner");
        contractsOwned[_owner].push(_transactionAddress);
    }


    /// @dev A lookup method for finding all contracts currently owned by parameter `address`
    /// @param _address address to lookup
    /// @return contracts an array of contracts owned by the user with parameter `address` in this factory
    function getContractsOwnedBy(address _address) public view returns (address[] memory _contracts) {
        return contractsOwned[_address];
    }

    /// @dev A lookup method for finding all contracts currently insured by parameter `address`
    /// @param _address address to lookup
    /// @return contracts an array of contracts owned by the user with parameter `address` in this factory
    function getContractsInsuredBy(address _address) public view returns (address[] memory _contracts) {
        return contractsInsuredBy[_address];
    }

    /// @dev returns the balance of the factory contract
    /// @return _balance 
    function getBalance() public view returns (uint _balance) {
        return address(this).balance;
    }


}