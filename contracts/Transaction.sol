pragma solidity ^0.4.2;


import './Insurable.sol';

contract Transaction is Insurable {
    address public beneficiary_address;

    TransactionStatus public status = TransactionStatus.Pending;
   

    enum TransactionStatus { Paid, Pending, Complete, Cancelled, Partial }
   

    event Paid(string _msg, uint bal);
    event PaymentReceived(string _msg, uint amount);
    event PartialPayment(string _msg, uint bal);
    event Completed(string _msg);
    event Cancelled(string _msg);

    function TransactionContract(
        address _recipient, 
        address _parent, 
        uint _max_coverage,
        uint _prem) {
        require(_parent!=0x0 && _recipient!=0x0);
        owner = msg.sender;
        max_coverage = _max_coverage;
        premium = _prem;
        beneficiary_address = _recipient;

    }

    function getBalance() constant returns (uint) {
        return this.balance;
    }

    function setBeneficiary(address _benefit) onlyOwner {
        beneficiary_address = _benefit;
    }


}