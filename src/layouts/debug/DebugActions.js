import store from '../../store'

import getWeb3 from '../../util/web3/getWeb3'
import TransactionContract from '../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

export const FUND_TRANSACTION = 'FUND_TRANSACTION'
export const CONTRACT_UPDATE = 'CONTRACT_UPDATE'
function transactionFunded(trxn) {
  return {
    type: FUND_TRANSACTION,
    payload: trxn
  }
}

function contractUpdate(details) {
    return {
        type: CONTRACT_UPDATE,
        payload: details
    }
}

export function fundTransaction() {
    
  let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
        const stransaction = contract(TransactionContract)
            stransaction.setProvider(web3.currentProvider)
            // Declaring this for later so we can chain functions on stransaction.
            var stransactionInstance

            console.log("Getting coinbase")
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                console.log(coinbase)
            

            // Get current ethereum wallet.
            stransaction.deployed().then(function(instance) {
                stransactionInstance = instance
                
                console.log(stransactionInstance)
                // Attempt to login user.
                stransactionInstance.fund({value:web3.toWei(1,'ether'), from:coinbase}).then(function(result) {
                // If no error, update user.
                console.log("Result is ", result)
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

export function fetchDetails() {
    
    let web3 = store.getState().web3.web3Instance
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
  
      return function(dispatch) {
        const stransaction = contract(TransactionContract)
        stransaction.setProvider(web3.currentProvider)

        // Declaring this for later so we can chain functions on stransaction.
            var stransactionInstance
        
            stransaction.deployed().then(function(instance) {
            stransactionInstance = instance
            
            console.log(stransactionInstance)
            // Attempt to login user.
            stransactionInstance.getInsuranceDetails.then(function(result) {
                // If no error, update user.
            console.log("Result is: ", result);

                // contractUpdate(result)
            }).catch(function(result) {
                console.log("Failed to get deployed contract")
                console.log(result)
                // If error...
            })
        })
      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }