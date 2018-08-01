pragma solidity ^0.4.2;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/InsurableTransactionFactory.sol";
import "../contracts/Transaction.sol";

contract TestFactory {
    // function testCreateContract()  public {
    //     InsurableTransactionFactory f = new InsurableTransactionFactory();
        
    //     bytes32 name = "This is a name";
    //     uint max = 10;
    //     bytes32 desc = "My description";P
    //     uint premium = 2;

    //     f.create(f,name,max,desc,premium);
    // }

    function testGetAllInsuredTransactions()  public {
        DeployedAddresses.Transaction();


        // InsurableTransactionFactory f = InsurableTransactionFactory();


        // Assert.equal(0,expected,"It should be zero");
      
    }
    
}