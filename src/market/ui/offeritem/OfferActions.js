// import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'
import store from '../../../store'
export const REFRESH_OFFERS = "REFRESH_OFFERS"

import { browserHistory } from 'react-router'


const contract = require('truffle-contract')

export const INSURE_TRANSACTION = 'INSURE_TRANSACTION'


// function insureTransaction(address) {
//   return {
//     type: INSURE_TRANSACTION,
//     payload: address
//   }
// }

export function purchaseOffer() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the escrow object.
      const trxn = contract(Transaction)
      trxn.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on trxn.
      var trxnInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        trxn.deployed().then(function(instance) {
          trxnInstance = instance

          /**
           *  TODO we need to some how figure out how to
           *  get the transaction instance 
           *  Factory[
           *   1,2,3,4,5 
           *   s]
           */
          trxnInstance.insure({from: coinbase})
          .then(function(result) {
            // If no error, login user.

            // dispatch(insureTransaction({"address": escrowInstance.address}))

          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
