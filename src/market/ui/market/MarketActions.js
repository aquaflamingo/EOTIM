import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'

import store from '../../../store'
const contract = require('truffle-contract')
export const REFRESH_OFFERS = "REFRESH_OFFERS"

function offersRefreshed(offers) {
    console.log("offers refreshed.. ", offers)
    return {
      type: REFRESH_OFFERS,
      payload: offers
    }
  }
  
  export function refreshOffers() {
    let web3 = store.getState().web3.web3Instance
  
    // Double-check web3's status.
    console.log("Offers refreshing...")
    if (typeof web3 !== 'undefined') {
      console.log("Web3 OKAY!!!  ",web3)
      
      return function(dispatch) {
        console.log("dispatching.. ")
        const factory = contract(InsurableTransactionFactory)
        factory.setProvider(web3.currentProvider)
        console.log("Factory, ",factory)
  
        factory.deployed().then(function(instance) {
          console.log("Transactions instance ", instance)
          instance.getTransactions.call()
            .then(function(result) {
  
              console.log("Offers are refreshed!! , ",result)
              dispatch(offersRefreshed(result))
  
            })
            .catch(function(err) {
              // If error, go to signup page.
              console.error('Error in getting factory ', err)
  
            })
        })
      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }