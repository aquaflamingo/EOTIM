pragma solidity ^0.4.24;


import "../Killable.sol";
import "../Transaction.sol";

contract TransactionRegistry is Killable {

    mapping(address => address[]) contractsInsuredBy;
    mapping(address => address[]) contractsOwnedBy;


    /// @dev constructor
    constructor()  public {
        owner = msg.sender;
    }

    /// @dev Registration method for new insured contracts
    /// @param _transactionAddress address of the transaction
    /// @param _insurer address of proposed insurer
    function registerInsurer(address _transactionAddress, address _insurer) public {
        Transaction trxnInsurer = Transaction(_transactionAddress);
        require(address(trxnInsurer.insurer) == _insurer, "Transaction is not insured by proposed registry insurer");
        contractsInsuredBy[_transactionAddress].push(_insurer);

    }

    /// @dev Registration method for new owned contracts
    /// @param _transactionAddress address of the transaction
    /// @param _owner address of proposed owner
    function registerOwnership(address _transactionAddress, address _owner) public {
        Transaction trxnOwner = Transaction(_transactionAddress);
        require(address(trxnOwner.owner) == _owner, "Transaction is not owned by proposed registry owner");
        contractsInsuredBy[_transactionAddress].push(_owner);
    }


    /// @dev A lookup method for finding all contracts currently owned by parameter `address`
    /// @param _address address to lookup
    /// @return contracts an array of contracts owned by the user with parameter `address` in this factory
    function getContractsOwnedBy(address _address) public view returns (address[] _contracts) {
        return contractsOwnedBy[_address];
    }

    /// @dev A lookup method for finding all contracts currently insured by parameter `address`
    /// @param _address address to lookup
    /// @return contracts an array of contracts owned by the user with parameter `address` in this factory
    function getContractsInsuredBy(address _address) public view returns (address[] _contracts) {
        return contractsInsuredBy[_address];
    }

    /// @dev returns the balance of the factory contract
    /// @return _balance 
    function getBalance() public view returns (uint _balance) {
        return address(this).balance;
    }


}