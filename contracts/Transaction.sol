pragma solidity ^0.4.24;


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

    // DEMO PURPOSES ONLY:
    string public demoClaimHash = "notreal";
    //

    enum TransactionState { Uninsured, Insured, Settled, ClaimPending }
    TransactionState public contract_state;

    event TransactionStatusChange(string message, TransactionState state);
    event PremiumPaid(string message, uint value);

    /// @dev basic constructor 
    /// @param  _counterparty counter party of contract
    /// @param _name name of transaction
    /// @param _desc description of transaction
    /// @param _max_coverage maximum set converage
    /// @param _prem premium of transaction
    /// @param _owner owner of transaction
    /// @param _value value of the transaction
    /// @return new transaction
    constructor(
        address _counterparty, 
        bytes32 _name, 
        bytes32 _desc, 
        uint _max_coverage, 
        uint _prem,
        address _owner,
        uint _value) public payable {
        
        require(_counterparty!=0x0, "Counter party cannot be blank");
        
        counter_party = _counterparty;
        owner = _owner;
        max_coverage = _max_coverage;
        premium_percent = _prem;
        name = _name;
        desc = _desc;
        contract_state = TransactionState.Uninsured;
        transaction_value = _value;
    }

    /// @dev The current state of the contract in the lifecycle
    /// @return state, the state of the transaction
    function getState() public view returns (TransactionState state) {
        return contract_state;
    }

    /// @dev gets the transaction details 
    /// @return _name, name of transaction
    /// @return _desc,  description of transaction
    /// @return _value, value of transaction
    /// @return _coverage, current coverage
    /// @return _maxCoverage, maximum set coverage
    /// @return _premium_percent, premium perecent
    /// @return _counterParty, counterparty of the transaction
    /// @return _insurer, insurer address
    /// @return _status, the state of the contract
    /// @return _owner, owner of this contract
    /// @return _balance, balance of contract
    function getTransactionDetails() public view returns (
            bytes32 _name, 
            bytes32 _desc, 
            uint _value,
            uint _coverage,
            uint _maxCoverage,
            uint _premium_percent,
            address _counterParty,
            address _insurer,
            uint status,
            address _owner,
            uint _balance
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
            uint(contract_state),
            owner,
            uint(address(this).balance)
        );
    }

    /// @dev insurer modifier
    modifier onlyInsurer() {
        if (msg.sender == insurer)
        _;
    }

    /// @dev allows the currently insurer to transfer their rights to a new insurer
    /// @param newOwner new insurer who is entitle to insurance settlment
    function transferInsurer(address newOwner) public onlyInsurer  {
        if (newOwner != address(0)) {
            insurer = newOwner;
        }
    }

    /// @dev insures the transaction locking up to the maximum coverage 
    /// @return _success 
    function insure() public payable returns (bool _success) {
        require(contract_state!=TransactionState.Insured,"Transaction is already insured");
        require(contract_state!=TransactionState.Settled, "Transaction has already been settled.");
        require((msg.value) <= (SafeMath.mul(max_coverage,SafeMath.div(address(this).balance,100))),"Value cannot exceed max coverage");
        
        current_coverage += msg.value;
        insurer = msg.sender;
        contract_state = TransactionState.Insured;
        emit TransactionStatusChange("The contract has been insured.",contract_state);
        return true;
    }

    /// @dev Begins a flow to settle the state of the escrow transaction, transfering the value
    /// ---- of contract to the counter party, and if insured transfers the exisiting coverage
    /// ---- and settlement fee is transfered to the insurer.  
    /// @return _success, successfully insured the contract or not
    function settle() public payable returns (bool _success) {
        require(contract_state!=TransactionState.Settled, "Transaction has already been settled."); 
        require(msg.sender == owner, "Transacton can only be settled by claim owner.");
        
        uint amount = transaction_value;
        transaction_value = 0;
        address(counter_party).transfer(amount);
        if (contract_state==TransactionState.Insured)
        {
            uint insurer_payback = current_coverage+msg.value;
            current_coverage = 0;
            address(insurer).transfer(insurer_payback);
            emit PremiumPaid("Insurance premium was paid.",1);
        } 
        contract_state = TransactionState.Settled;
        emit TransactionStatusChange("The contract has been settled", contract_state);
        return true;
    }

    

    /// @dev gets the balance of the contract
    /// @return _balance balance of this contract
    function getBalance() public view returns (uint _balance) {
        return address(this).balance;
    }

      /// @dev fallback payable function
    function() public payable {}


    /// =================== NOT REAL =============================

    /// @dev THIS IS FOR FUN PURPOSES ONLY & WOULD BE DELETED IN A REAL APP
    /// ---- a true clams process would need to provide a real IPFS document hash
    /// ---- and a set of validations would be made using perhaps an oracle
    /// ---- in order to execute the claims payback
    // function fMakeDemoClaim(string proofHash) external  {
    //     require(contract_state == TransactionState.Insured, "Transaction must be insured to escalate to make a claim");
    //     require(keccak256(proofHash) == keccak256(demoClaimHash), "Evidence is not substantial enough to escalate to claims process");
    //     // Proof has been provided yay, transfer coverage to defaultee!

    //     address(counter_party).transfer(current_coverage);
    //     current_coverage = 0;

    //     contract_state = TransactionState.Settled;
    //     emit TransactionStatusChange("The claim on the contract has been settled", contract_state);
    // }

    /// ==========================================================
}