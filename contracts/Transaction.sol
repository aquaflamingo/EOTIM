pragma solidity ^0.4.2;


import './Insurable.sol';

contract Transaction is Insurable {
    address public counter_party;

    TransactionStatus public status = TransactionStatus.Pending;
   
    enum TransactionStatus { Paid, Pending, Complete, Cancelled, Partial }
   

    event Paid(string _msg, uint bal);
    event PaymentReceived(string _msg, uint amount);
    event PartialPayment(string _msg, uint bal);
    event Completed(string _msg);
    event Cancelled(string _msg);

    function Transaction(address _counterparty, uint _max_coverage, uint _prem) public {
        require(_counterparty!=0x0);
        counter_party = _counterparty;
        owner = msg.sender;
        max_coverage = _max_coverage;
        premium = _prem;

    }

    // function completeTransaction(bool success) public onlyOwner {

    //    msg.sender.transfer(this.balance);
    // }

    function getBalance() public constant returns (uint) {
        return this.balance;
    }

    function setCounterParty(address _party) public onlyOwner {
        counter_party = _party;
    }

    // Fallback function
    function() public payable {}
}