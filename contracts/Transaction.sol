pragma solidity ^0.4.2;


import "./Killable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Transaction  is Killable {
    using SafeMath for uint256;

    // value of the transaction 
    uint256 public value;
    // Counter party is the party which is on the receiving end of this transaction
    address public counterParty;
    // Name of the transaction contract
    bytes32 public name;
    // description of the transaction
    bytes32 public desc;
    // person insuring this contract
    address public insurer;
    // the current insurance coverage deposited in this contract
    uint public currentCoverage;
    // maximum coverage allowed
    uint public maxCoverage;
    // premium to be paid for the insurance
    uint public premium;
    // owner
    address public owner;

    Insurance public insuranceStatus;

    event TransactionInsured(string message);
    enum Insurance { Insured, Uninsured }

    constructor(
        address _counterparty, 
        bytes32 _name, 
        bytes32 _desc, 
        uint _max_coverage, 
        uint _prem,
        address _owner,
        uint _value
        ) public payable {
        require(_counterparty!=0x0);
        counterParty = _counterparty;
        owner = _owner;
        maxCoverage = _max_coverage;
        premium = _prem;
        name = _name;
        desc = _desc;
        insuranceStatus = Insurance.Uninsured;
        value = _value;
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
            uint _insured,
            address _owner
            ) {

        return (
            name, 
            desc, 
            value, 
            currentCoverage, 
            maxCoverage,
            premium,
            counterParty,
            insurer,
            uint(insuranceStatus),
            owner
        );
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
        require(insuranceStatus!=Insurance.Insured,"Transaction is already insured");
        require((msg.value)<=(maxCoverage*1 ether)/10,"Value cannot exceed max coverage");
        
        currentCoverage += msg.value;
        insuranceStatus = Insurance.Insured;
        insurer = msg.sender;
        return true;
    }

    function settle() public payable {
        //TODO Settle contract and pay back insurer 
        // address(counterParty).transfer(value);
        // if (insuranceStatus==Insurance.Insured) {
        //     address(insurer).transfer(currentCoverage);
        // }

        return;
    }


}