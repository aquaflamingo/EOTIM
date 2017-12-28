pragma solidity ^0.4.2;


import './Insurable.sol';

contract Transaction is Insurable {
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
}