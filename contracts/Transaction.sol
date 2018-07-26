pragma solidity ^0.4.2;


import './Killable.sol';

contract Transaction is Killable {


    address public counterParty;
    bytes32 public name;
    bytes32 public desc;
    address public insurer;
    uint public coverage;
    uint public maxCoverage;
    uint public premium;
    Insurance public insuranceStatus;
    event TransactionInsured(string message);
    enum Insurance { Insured, NonInsured }

    function Transaction(address _counterparty, bytes32 _name, bytes32 _desc, uint _max_coverage, uint _prem) public {
        require(_counterparty!=0x0);
        counterParty = _counterparty;
        owner = msg.sender;
        maxCoverage = _max_coverage;
        premium = _prem;
        name = _name;
        desc = _desc;
        insuranceStatus = Insurance.NonInsured;
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
            uint _maxCoverage,
            uint _premium,
            address _counterParty,
            address _insurer,
            uint insured) {
                return (name, desc, this.balance, coverage, maxCoverage,premium,counterParty,insurer,uint(insuranceStatus));
            }


    modifier onlyInsurer() {
        if (msg.sender == insurer)
        _;
    }

    function transferOwnership(address newOwner) public onlyInsurer  {
        if (newOwner != address(0)) {
            insurer = newOwner;
        }
    }

    function insure() public payable returns (bool _success) {
        // require(coverage<=maxCoverage);
        // require((coverage+msg.value)<=maxCoverage);
        // require(insuranceStatus!=Insurance.Insured);

        coverage += msg.value;
        insuranceStatus = Insurance.Insured;
        insurer = msg.sender;
        return true;
    }



    function setMaxCoverage(uint _coverage) onlyOwner public  {
        maxCoverage = _coverage;
    }

    function setPremium(uint _premium) onlyOwner public {
        require(_premium>0);
        premium = _premium;
    }


}