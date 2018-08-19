pragma solidity ^0.4.2;


import "./Killable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Transaction  is Killable {
    using SafeMath for uint256;

    // value of the transaction 
    uint256 public transaction_value;
    // Counter party is the party which is on the receiving end of this transaction
    address public counter_party;
    // Name of the transaction contract
    bytes32 public name;
    // description of the transaction
    bytes32 public desc;
    // person insuring this contract
    address public insurer;
    // the current insurance coverage deposited in this contract
    uint public current_coverage;
    // maximum coverage allowed
    uint public max_coverage;
    // premium to be paid for the insurance
    uint public premium_percent;
    // owner
    address public owner;

    uint public premium_payout;
    
    TransactionState public insuranceStatus;

    event TransactionStatusChange(string message);
    event PremiumPaid(string message, uint value);

    enum TransactionState { Uninsured, Insured, Settled }


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
        // TODO require that msg.value have value of transaction
        // PLUS the prepaid premium of the contract 
        counter_party = _counterparty;
        owner = _owner;
        max_coverage = _max_coverage;
        premium_percent = _prem;
        name = _name;
        desc = _desc;
        insuranceStatus = TransactionState.Uninsured;
        transaction_value = _value;
        
    }

    /// @dev The current state of the contract in the lifecycle
    /// @return state, the state of the transaction
    function getState() public view returns (TransactionState state) {
        return insuranceStatus;
    }

    // Only return relevant details for would be insurer
    function getTransactionDetails() public view returns (
            bytes32 _name, 
            bytes32 _desc, 
            uint _value,
            uint _coverage,
            uint _maxCoverage,
            uint _premium_percent,
            address _counterParty,
            address _insurer,
            uint _insured,
            address _owner
            ) {

        return (
            name, 
            desc, 
            transaction_value, 
            current_coverage, 
            max_coverage,
            premium_percent,
            counter_party,
            insurer,
            uint(insuranceStatus),
            owner
        );
    }


    modifier onlyInsurer() {
        if (msg.sender == insurer)
        _;
    }

    function transferInsurer(address newOwner) public onlyInsurer  {
        if (newOwner != address(0)) {
            insurer = newOwner;
        }
    }



    function insure() public payable returns (bool _success) {
        require(insuranceStatus!=TransactionState.Insured,"Transaction is already insured");
        require(insuranceStatus!=TransactionState.Settled, "Transaction has already been settled.");
        require((msg.value)<=(max_coverage*1 ether)/10,"Value cannot exceed max coverage");
        
        current_coverage += msg.value;

         // premium payout is equal to (max_coverage*transaction_value)*premium_percent
        // percentages are stored as integers /100
        // premium_payout = mul(div(mul(max_coverage,premium_percent),10000),transaction_value);

        insuranceStatus = TransactionState.Insured;
        insurer = msg.sender;
        emit TransactionStatusChange("Insured");

        return true;
    }

    //TODO have claims maker deposit premium + value of transaction into escrow 
    //settlment, insurer takes premium claim + back their insurance
    // TODO error here.. 
    function settle() public payable onlyOwner returns (bool success) {
        require(insuranceStatus!=TransactionState.Settled, "Transaction has already been settled."); 
        require(msg.sender == owner, "Transacton can only be settled by claim owner.");
        
        address(counter_party).transfer(transaction_value);

        if (insuranceStatus==TransactionState.Insured) {
            uint insurer_payback = current_coverage+msg.value;
            address(insurer).transfer(insurer_payback);
            emit PremiumPaid("Insurance premium was paid.",1);
        } else {
            // No insurance, user get's back prepaid premium

        }

        insuranceStatus = TransactionState.Settled;
        emit TransactionStatusChange("Settled");
        
        return true;
    }

    //TODO Claims 
    // function makeClaim() {}


    // Fallback function
    function() public payable {}

}