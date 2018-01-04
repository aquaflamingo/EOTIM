pragma solidity ^0.4.2;


import './Ownable.sol';
import './Killable.sol';

contract Transaction is Ownable, Killable {


    address public counterParty;
    string public name;
    string public desc;

    TransactionStatus public status = TransactionStatus.Pending;
   
    enum TransactionStatus { Paid, Pending, Complete, Cancelled, Partial }
   

    event Paid(string _msg, uint bal);
    event PaymentReceived(string _msg, uint amount);
    event PartialPayment(string _msg, uint bal);
    event Completed(string _msg);
    event Cancelled(string _msg);

    function Transaction(address _counterparty, string _name, string _desc, uint _max_coverage, uint _prem) public {
        require(_counterparty!=0x0);
        counterParty = _counterparty;
        owner = msg.sender;
        maxCoverage = _max_coverage;
        premium = _prem;
        name =_name;
        desc =_desc;
    }


    function setCounterParty(address _party) public onlyOwner {
        counterParty = _party;
    }

    // Fallback function
    function() public payable {}


    // Only return relevant details for would be insurer
    function getTransactionDetails() public constant returns (
            string name, 
            string desc, 
            uint value,
            uint coverage,
            uint maxCoverage,
            uint premium,
            address counterParty,
            address insurer) {
                return (name, desc, this.balance, coverage, maxCoverage,premium,counterParty,insurer);
            }

     address public insurer;
    uint public coverage;
    uint public maxCoverage;
    uint public premium;
    
    event Insured(string _msg, uint value);
    event InsurancePayout(string _msg, uint payout);
  
    Insurance public insuranceStatus = Insurance.NonInsured;
    enum Insurance { Insured, NonInsured }


    modifier onlyInsurer() {
        if (msg.sender == insurer)
        _;
    }

    function transferOwnership(address newOwner) public onlyInsurer  {
        if (newOwner != address(0)) {
            insurer = newOwner;
        }
    }

    function insure() public payable onlyInsurer {
        require(coverage<=maxCoverage && (coverage+msg.value)<=maxCoverage);
        coverage+=msg.value;
        Insured("Transaction insured up to",coverage);
        insuranceStatus = Insurance.Insured;
        // Cannot over insure an escrow contract beyond coverage set
        // require(this.insurance_coverage<=msg.value);
     
    }

    function becomeInsurer() public  {
        require(insurer==0x0);
        insurer = msg.sender;
        // If insurance status is 0, then we can 
        // set insurer
    }


    function setMaxCoverage(uint _coverage) onlyOwner public  {
        maxCoverage = _coverage;
    }

    function setPremium(uint _premium) onlyOwner public {
        require(_premium>0);
        premium = _premium;
    }


}