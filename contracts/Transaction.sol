pragma solidity ^0.4.2;


import './Killable.sol';

contract Transaction is Killable {


    address public counterParty;
    bytes32 public name;
    bytes32 public desc;
    address public insurer;
    uint public coverage;
    uint8 public maxCoverage;
    uint8 public premium;


    function Transaction(address _counterparty, bytes32 _name, bytes32 _desc, uint8 _max_coverage, uint8 _prem) public {
        require(_counterparty!=0x0);
        counterParty = _counterparty;
        owner = msg.sender;
        maxCoverage = _max_coverage;
        premium = _prem;
        name = _name;
        desc = _desc;

    }

    function getN() returns (uint) {
        return maxCoverage;
    }

    function setCounterParty(address _party) public onlyOwner {
        counterParty = _party;
    }

    // Fallback function
    function() public payable {}


    // Only return relevant details for would be insurer
    function getTransactionDetails() public constant returns (
            bytes32 _name, 
            bytes32 _desc, 
            uint _value,
            uint _coverage,
            uint8 _maxCoverage,
            uint8 _premium,
            address _counterParty,
            address _insurer) {
                return (name, desc, this.balance, coverage, maxCoverage,premium,counterParty,insurer);
            }
    
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
        coverage += msg.value;
        // Insured("Transaction insured up to",coverage);
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


    function setMaxCoverage(uint8 _coverage) onlyOwner public  {
        maxCoverage = _coverage;
    }

    function setPremium(uint8 _premium) onlyOwner public {
        require(_premium>0);
        premium = _premium;
    }


}