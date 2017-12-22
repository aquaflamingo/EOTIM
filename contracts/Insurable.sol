pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './zeppelin/ownership/Ownable.sol';

contract Insurable is Ownable {
    address public insurer;
    uint public coverage;
    uint public max_coverage;
    uint public premium;
    
    event Insured(string _msg, uint value);
    event InsurancePayout(string _msg, uint payout);
  
    Insurance public insurance_status = Insurance.NonInsured;
    enum Insurance { Insured, NonInsured }

    function Insurable() {

    }

    modifier onlyInsurer() {
        if (msg.sender == insurer)
        _;
    }

    function transferOwnership(address newOwner) onlyInsurer {
        if (newOwner != address(0)) {
            insurer = newOwner;
        }
    }

    function insure() payable onlyInsurer {
        require(coverage<=max_coverage && (coverage+msg.value)<=max_coverage);
        coverage+=msg.value;
        Insured("Transaction insured up to",coverage);
        insurance_status = Insurance.Insured;
        // Cannot over insure an escrow contract beyond coverage set
        // require(this.insurance_coverage<=msg.value);
     
    }

    function obtainInsurerStatus() {
        require(insurer==0x0);
        insurer = msg.sender;
        // If insurance status is 0, then we can 
        // set insurer
    }


    function setMaxCoverage(uint _coverage) onlyOwner {
        max_coverage = _coverage;
    }

    function setPremium(uint _premium) onlyOwner {
        require(_premium>0);
        premium = _premium;
    }

    function getInsuranceDetails() returns (uint _prem, uint _curr_cover, uint _max_cover, address _insurer) {
        return (premium, coverage, max_coverage, insurer);
    }

    
}
