pragma solidity ^0.4.2;

import './Killable.sol';
import './Ownable.sol';

contract Insurable is Ownable, Killable {
    address public insurer;
    uint public coverage;
    uint public max_coverage;
    uint public premium;
    
    event Insured(string _msg, uint value);
    event InsurancePayout(string _msg, uint payout);
  
    Insurance public insurance_status = Insurance.NonInsured;
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

    function insure() public payable onlyInsurer  {
        require(coverage<=max_coverage && (coverage+msg.value)<=max_coverage);
        coverage+=msg.value;
        Insured("Transaction insured up to",coverage);
        insurance_status = Insurance.Insured;
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
        max_coverage = _coverage;
    }

    function setPremium(uint _premium) onlyOwner public {
        require(_premium>0);
        premium = _premium;
    }

    function getInsuranceDetails() public returns (uint _prem, uint _cover, uint _max_cover, address _insurer) {
        return (premium, coverage, max_coverage, insurer);
    }

    
}
