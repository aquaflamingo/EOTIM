import store from '../../../store'
import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

export const CONTRACT_CREATE = 'CONTRACT_CREATE'
export const CONTRACT_NOT_CREATE = 'CONTRACT_NOT_CREATE'
export const CONTRACT_NOT_FOUND = 'CONTRACT_NOT_FOUND'
export const CONTRACT_FOUND = 'CONTRACT_NOT_FOUND'

/**
 * For redux state updates
 * @param {object} details 
 */
function contractCreated(details) {
    return {
        type: CONTRACT_CREATE,
        payload: details
    }
}

function contractNotCreated(details) {
    return {
        type: CONTRACT_NOT_CREATE,
        payload: details
    }
}

/**
 * For redux state updates
 * @param {object} details 
 */
function contractFound(details) {
    return {
        type: CONTRACT_FOUND,
        payload: details
    }
}

/**
 * For redux state updates
 * @param {object} details 
 */
function contractNotFound(details) {
    return {
        type: CONTRACT_NOT_FOUND,
        payload: details
    }
}

 /**
   * Determines whether or not the status is insured or not
   * @param {string} status 
   */
  function isInsured(status) {
    if (status=="0x0000000000000000000000000000000000000000") {
      return false;
    } 

    return true;
  }
  
export function lookupTransaction(address) {
    let web3 = store.getState().web3.web3Instance
    console.log("Attempting to lookup insurance contract ", address)
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            let trxn = contract(Transaction)
            trxn.setProvider(web3.currentProvider)
            trxn.at(address)
            // Get contract at the specific address and call it's details
              .then((instance)=> {
                instance.getTransactionDetails.call()
                .then(function(results) {
                    // resolve promise successfully
                      var insuredStatus = isInsured(results[7]);
    
                      var result = {
                        address:address,
                        offerName: web3.toAscii(results[0]),
                        description: web3.toAscii(results[1]),
                        val: web3.fromWei(results[2],'ether').toNumber(),
                        maxCoverage:  results[4].toNumber(),
                        terms: results[5].toNumber(),
                        counterParty: results[6],
                        isInsured: insuredStatus
                      }
                      console.log("Contract ", result.offerName, " found!")
                      dispatch(contractFound(result))
                  })
            }).catch(function(err) {
                console.log("Contract could not be found.. ", err)
                var result ={error:"Contract does not exist."}
                // reject promise.. error
                dispatch(contractNotFound(result))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
/**
 * Creates the new insurance offering by calling Factory contract
 * @param {object} values 
 */
export function createTransaction(values) {
    let web3 = store.getState().web3.web3Instance
  // Double-check web3's status.
  console.log("Attempting to create new insurance contract offer.")

  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
        
        const factory = contract(InsurableTransactionFactory)
        
        factory.setProvider(web3.currentProvider)

    
        // Declaring this for later so we can chain functions on factory.
        var factoryInstance

        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
                console.error(error);
            }
            
            // Get current ethereum wallet.
            factory.deployed().then(function(instance) {
                factoryInstance = instance
                
                var newTrxnEvent = factoryInstance.NewContractCreated()
                    newTrxnEvent.watch(function(error, result){
                        if (!error)
                        {
                            console.log("Factory successfully deployed new contract ", result)
                        } else {
                            // Error
                            console.log("Failed to get deployed contract")
                            console.log(error);
                        }
                    });

                let ethVal = web3.toWei(parseFloat(values.transactionValue),'ether');
                console.log("Values in contract creation are ", values)
                
                factoryInstance.create(
                    values.counterPartyAddress,
                    values.transactionName,
                    values.maxInsurance,
                    values.transactionDescription,
                    values.insurerPremium,
                    {from:coinbase, value:ethVal})
                .then(function(result) {
                    dispatch(contractCreated(result))
                    
                    console.log("Completed contract creation.")
                })
                .catch(function(err) {
                    let error = {message: err.msg}
                
                    
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
