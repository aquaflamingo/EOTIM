import Transaction from '../../../../build/contracts/Transaction.json'
import store from '../../../store'
export const REFRESH_OFFERS = "REFRESH_OFFERS"

import { browserHistory } from 'react-router'


const contract = require('truffle-contract')

export const INSURE_TRANSACTION = 'INSURE_TRANSACTION'

/* Used to udpate redux store */
function insuredTransaction(address) {
  return {
    type: INSURE_TRANSACTION,
    payload: address
  }
}

/**
 * An action to allow individual users to purchase the offer presented in the offer box
 * */ 
export function purchaseOffer(address,val) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
       // Get current ethereum wallet.
       web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error("error ", error);
        }

        console.log("A purchase order has been executed on the offer ",address," for the value of ", val) 

        // Grab transaction contract & set provider
        const trxn = contract(Transaction)
        trxn.setProvider(web3.currentProvider)

        /* Grab the transaction at the address provided in the purchase offer function */
        trxn.at(address)
          .then((instance)=> {

            /* Watch for transaction insurance event */
            var inst = instance.TransactionInsured();
            inst.watch(function(error, result){
              console.log("Transaction watching for insured status.",error,result)
              if (!error)
              {
                  console.log("Offer was insured successfully. Tx receipt: ", result)
              } else {
                  // Error
                  console.log("Failed to insure contract")
                  console.log(error);
              }
            })

            var ethVal = web3.toWei(val,'ether');

            instance.insure({from:coinbase,value:ethVal})
                  .then(function(results) {
                      console.log("Attempting to insure contract..")
                      /* dispatch contract insured */
                      dispatch(insuredTransaction(results))
                      
                      console.log("Success!", results)
                    })
                    .catch(function(err) {

                      console.log("Error this contract cannot be insured...", err)
                  })

        
          })
        })
      }
  } else {
    console.error('Web3 is not initialized.');
  }
}
