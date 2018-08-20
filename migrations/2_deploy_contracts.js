var Ownable = artifacts.require("./Ownable.sol");
var Killable = artifacts.require("./Killable.sol");
var SafeMath = artifacts.require('./SafeMath');
var InsurableTransactionFactory = artifacts.require('./InsurableTransactionFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.deploy(SafeMath);
  deployer.deploy(InsurableTransactionFactory)
};
