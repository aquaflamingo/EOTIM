pragma solidity ^0.4.2;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/InsurableTransactionFactory.sol";
import "../contracts/Transaction.sol";

contract TestFactory {
    function testCreateContract()  public {
        InsurableTransactionFactory f = new InsurableTransactionFactory();
        
        bytes32 name = "This is a name";
        uint max = 10;
        bytes32 desc = "My description";
        uint premium = 2;

        f.create(f,name,max,desc,premium);
    }

    function testGetAllOwnedTransactions()  public {
        InsurableTransactionFactory f = InsurableTransactionFactory( DeployedAddresses.Transaction());
      
    }

    function testGetTransactions()  public {
        InsurableTransactionFactory f = InsurableTransactionFactory( DeployedAddresses.Transaction());
        Transaction[] memory t  = f.getTransactions();
        uint expected = 1;

        Assert.equal(t.length,expected, "It should retrieve the transactions in the contract");

      
    }
    
}