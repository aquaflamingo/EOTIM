import store from '../../store'

import TransactionContract from '../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

export const CONTRACT_UPDATE = 'CONTRACT_UPDATE'


function contractUpdate(details) {
    console.log("Contract Update")
    return {
        type: CONTRACT_UPDATE,
        payload: details
    }
}

export function createTransaction() {
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

export function insureTransaction() {
    
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

export function fetchDetails() {
    
    let web3 = store.getState().web3.web3Instance
    
    console.log("ACTIONS: Fetch Details")
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
  
      return function(dispatch) {
        console.log("Grabbing Contract")
        const stransaction = contract(TransactionContract)
        stransaction.setProvider(web3.currentProvider)
        console.log("Grabbing Contract")
        // Declaring this for later so we can chain functions on stransaction.
        var stransactionInstance
        
        stransaction.deployed().then(function(instance) {
            stransactionInstance = instance
            
            console.log("Contract found ",instance)
            console.log("Pinging Insurance Details")
            // Attempt to login user.
            stransactionInstance.getInsuranceDetails.call().then(function(result) {
                // If no error, update user.
                
            var contract = {
                premium: result[0].toString(),
                coverage: result[1].toString(),
                max_coverage: result[2].toString(),
                insurer:result[3].toString()
            }
            console.log("Details: ",contract)
            dispatch(contractUpdate(contract))
            }).catch(function(result) {
                console.log("Failed to get deployed contract")
                console.log(result)
                // If error...
            })
        }).catch(function(err) {
            console.log("Failed to get deployed instance.. ", err)
        })
      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }