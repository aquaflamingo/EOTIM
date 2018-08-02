pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/Transaction.sol";

contract TestTransaction {
    function testInsure() public {
        Transaction t = Transaction(DeployedAddresses.Transaction());
        bool val = t.insure();
        bool expected = true;

        Assert.equal(val,expected,"It should return true");
    }
}