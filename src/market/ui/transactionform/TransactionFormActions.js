import store from '../../../store'
import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

export const CONTRACT_CREATE = 'CONTRACT_CREATE'

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
                
                var newTrxnEvent = factoryInstance.NewContractAddress()
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

                var ethVal = web3.toWei(parseFloat(values.transactionValue),'ether');
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
