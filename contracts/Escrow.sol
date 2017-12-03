pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './zeppelin/ownership/Ownable.sol';


contract Escrow is Ownable {
    address public owner;
    address public beneficiary_address;
    address public parent;
    address public insurer;

    uint public escrow_amount;
    uint public insurance_coverage;
    uint public max_coverage;
    uint public premium;
    
    EscrowStatus public status = EscrowStatus.Pending;
    Insurance public insured = Insurance.NonInsured;

    enum EscrowStatus { Paid, Pending, Complete, Cancelled, Partial }
    enum Insurance { Insured, NonInsured }

    event Paid(string _msg, uint bal);
    event PaymentReceived(string _msg, uint amount);
    event PartialPayment(string _msg, uint bal);
    event Completed(string _msg);
    event Cancelled(string _msg);
    event OverPay(string _msg);
    
    event Insured(string _msg);
    event InsurancePayout(string _msg, uint payout);

    function EscrowContract(uint _amount, address _recipient, address _parent) {
        require(_parent!=0x0 && _amount>0 && _recipient!=0x0);
        owner = msg.sender;
        parent = _parent;
        escrow_amount = _amount;
        beneficiary_address = _recipient;

    }

    function getBalance() constant returns (uint) {
        return this.balance;
    }

    function fundEscrow() payable {
        require(this.balance<=escrow_amount);
        if (this.balance==escrow_amount) {
            Paid("Escrow paid..",this.balance);
            status = EscrowStatus.Paid;
        } else {
            PartialPayment("Partial Payment..", this.balance);
        }
    }

    function insure() payable {
        // Cannot over insure an escrow contract beyond coverage set
        // require(this.insurance_coverage<=msg.value);

        insurer = msg.sender;
        insured = Insurance.Insured;
        insurance_coverage = msg.value;
        Insured("Escrow insured");
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