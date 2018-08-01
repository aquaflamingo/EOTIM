import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import {fetchOfferDetails} from '../../../util/contractUtils'

import store from '../../../store'
const contract = require('truffle-contract')
export const REFRESH_OFFERS = "REFRESH_OFFERS"

/**
 * Returns the payload user to update the redux state
 * @param {array} offers 
 */
function offersRefreshed(offers) {
    return {
      type: REFRESH_OFFERS,
      payload: offers
    }
  }
  function offersCleared() {
    return {
      type: REFRESH_OFFERS,
      payload: null
    }
  }

  export function clearOffers() {
    return function(dispatch) {
      dispatch(offersCleared())
      console.log("Offers Cleared.")
    }
  }
 
  


  /** 
   * Refreshes and checks for the offers present in the contract 
  */
  export function refreshOffers() {
    console.log("Refreshing offers in Marketplace..")
    let web3 = store.getState().web3.web3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
      
      return function(dispatch) {
        const factory = contract(InsurableTransactionFactory)
        factory.setProvider(web3.currentProvider)
  
        factory.deployed().then(function(instance) {
          instance.getTransactions.call()
            .then(function(result) {
                fetchOfferDetails(result)
                  .then(function(data){
                  // data received is in order of creation. 
                  // iterate through data and provide filtering options where needed
                  console.log("List of Contracts obtained from Factory: ", data);

                  dispatch(offersRefreshed(data))
                  console.log("Offers refreshed");
                })
            })
            .catch(function(err) {
              // If error, go to signup page.
              console.error('Error in getting factory ')
              console.log(err)
  
            })
        })
      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }