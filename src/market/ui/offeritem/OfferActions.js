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

export function purchaseOffer(address,val) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
       // Get current ethereum wallet.
       web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        console.log("Add and val is ",address,val)
        const trxn = contract(Transaction)
        trxn.setProvider(web3.currentProvider)
        trxn.at(address)
          .then((instance)=> {
            instance.insure({from:coinbase,value:web3.toWei(val,'ether')})
                  .then(function(results) {
                    // dispatch(insuredTransaction())
                        console.log(results)
                    })
                    .catch(function(err) {
                      console.log(err)
                  })
              })
          })
      }
  } else {
    console.error('Web3 is not initialized.');
  }
}
