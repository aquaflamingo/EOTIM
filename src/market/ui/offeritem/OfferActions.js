import Escrow from '../../../../build/contracts/Escrow.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const INSURE_ESCROW = 'INSURE_ESCROW'

function insureEscrow(address) {
  return {
    type: INSURE_ESCROW,
    payload: address
  }
}

export function purchaseOffer() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the escrow object.
      const escrow = contract(Escrow)
      escrow.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on escrow.
      var escrowInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        escrow.deployed().then(function(instance) {
          escrowInstance = instance

          // Attempt to login user.
          escrowInstance.insure({from: coinbase})
          .then(function(result) {
            // If no error, login user.

            dispatch(insureEscrow({"address": escrowInstance.address}))

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
