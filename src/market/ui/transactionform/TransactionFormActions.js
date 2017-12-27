import store from '../../../store'
import getWeb3 from '../../../util/web3/getWeb3'
import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
const contract = require('truffle-contract')

export const CONTRACT_CREATE = 'CONTRACT_CREATE'


function contractCreate(details) {
    return {
        type: CONTRACT_CREATE,
        payload: details
    }
}


function validateTransaction(properties) {
    
}
export function createTransaction(values) {
    let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  validateTransaction(values)
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
        console.log("ADDRESS", values.counterPartyAddress)
        console.log(values);
        const factory = contract(InsurableTransactionFactory)
        factory.setProvider(web3.currentProvider)
        // Declaring this for later so we can chain functions on factory.
        var factoryInstance

        console.log("Getting coinbase")
        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
                console.error(error);
            }

            console.log("Coinbase... ", coinbase)


            // Get current ethereum wallet.
            factory.deployed().then(function(instance) {
                factoryInstance = instance
                
                console.log("Factory Instance... ", factoryInstance)
                factoryInstance.create(
                {
                    counterParty:values.counterPartyAddress.toString(),
                    max:values.maxInsurance,
                    premium:values.insurerPremium,
                    from:coinbase,
                    value: web3.toWei(values.transactionValue,'ether')})
                .then(function(result) {
                
                console.log("Result is ", result)

                }).catch(function(err) {
                    console.log("Failed to get deployed contract")
                    console.log(err)
                // If error...
                })
            })
        })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
