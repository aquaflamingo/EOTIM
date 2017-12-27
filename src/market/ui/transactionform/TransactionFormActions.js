import store from '../../store'

import getWeb3 from '../../util/web3/getWeb3'
import InsurableTransactionFactory from '../../../build/contracts/InsurableTransactionFactory.json'
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

                console.log(coinbase)
            

            // Get current ethereum wallet.
            factory.deployed().then(function(instance) {
                factoryInstance = instance
                
                console.log(factoryInstance)
                address counterParty, uint max, uint premium

                (address _cparty, uint _max, uint _premium)
            factoryInstance.create(
                {value:web3.toWei(1,'ether'), 
                from:coinbase, 
                counterParty:values.counterPartyAddress,
                max:

            }).then(function(result) {
                
                console.log("Result is ", result)
                fetchDetails();
            }).catch(function(result) {
                console.log("Failed to get deployed contract")
                console.log(result)
                // If error...
                })
            })
        })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
