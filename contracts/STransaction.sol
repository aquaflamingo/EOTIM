pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './zeppelin/ownership/Ownable.sol';
import './Insurable.sol';

contract STransaction is Ownable, Insurable {
    address public owner;
    address public beneficiary_address;

    uint public transaction_value;
    uint public max_coverage;
    uint public premium;
    
    TransactionStatus public status = TransactionStatus.Pending;
    Insurance public insured = Insurance.NonInsured;

    enum TransactionStatus { Paid, Pending, Complete, Cancelled, Partial }
    enum Insurance { Insured, NonInsured }

    event Paid(string _msg, uint bal);
    event PaymentReceived(string _msg, uint amount);
    event PartialPayment(string _msg, uint bal);
    event Completed(string _msg);
    event Cancelled(string _msg);
    event OverPay(string _msg);
    
    event Insured(string _msg);
    event InsurancePayout(string _msg, uint payout);

    function STransactionContract(uint _amount, address _recipient, address _parent) {
        require(_parent!=0x0 && _amount>0 && _recipient!=0x0);
        owner = msg.sender;
        transaction_value = _amount;
        beneficiary_address = _recipient;

    }

    function getBalance() constant returns (uint) {
        return this.balance;
    }

    function fundTransaction() payable {
        require(this.balance<=transaction_value);
        if (this.balance==transaction_value) {
            Paid("Transaction paid..",this.balance);
            status = TransactionStatus.Paid;
        } else {
            PartialPayment("Partial Payment..", this.balance);
        }
    }



    // Set to only owner 
    function setPremium(uint _premium) onlyOwner {
        require(_premium>0);
        premium = _premium;
    }

    function setMaxInsuranceCoverage(uint _coverage) onlyOwner {
        require(_coverage>0);
        max_coverage = _coverage;
    }


}