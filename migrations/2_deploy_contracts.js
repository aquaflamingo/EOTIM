var Ownable = artifacts.require("./Ownable.sol");
var Killable = artifacts.require("./Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");
var Insurable = artifacts.require('./Insurable.sol');
var Transaction = artifacts.require('./Transaction.sol');
var InsurableTransactionFactory = artifacts.require('./InsurableTransactionFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(Insurable)
  deployer.link(Insurable, Transaction);
  deployer.deploy(InsurableTransactionFactory)
};
