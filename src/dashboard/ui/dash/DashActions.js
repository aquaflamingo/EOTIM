import store from '../../../store'
import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
// import Transaction from '../../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')
import {fetchOfferDetails, fakeCreateTransaction} from '../../../util/contractUtils'


export const GET_OWNED_OFFERS = "GET_OWNED_OFFERS"

function ownedOffersRefreshed(offers) {
    return {
        type: GET_OWNED_OFFERS,
        payload: offers
    }
}

function fake() {
    return function(dispatch) {
        fakeCreateTransaction()
        .then(function(results){
            console.log("Results are ", results);
        
            dispatch(ownedOffersRefreshed(results))
        }).catch(function(err) {
            console.log(err)
        })
    }
}

function fetchOwnedOffers() {
    let web3 = store.getState().web3.web3Instance

    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((error, coinbase) => {
                if (error) {
                    console.error("Error getting coinbase ", error);
                } else {
                    console.log("Fetching owned insured transactions for coinbase ", coinbase)
                    
                    const factory = contract(InsurableTransactionFactory)
                    factory.setProvider(web3.currentProvider)
                    
                    // Get all the contracts owned by the "ownerAddress" in the Factory
                    factory.deployed().then(function(inst){
                        let instance = inst;
                        instance.getContractIdsOwnedBy.call(coinbase)
                            .then(function(result) {
                                fetchOfferDetails(result)
                                    .then(function(data){
                                    // data received is in order of creation. 
                                    // iterate through data and provide filtering options where needed
                                    console.log("Success getting all insured transactions : ", data);
                                    dispatch(ownedOffersRefreshed(data))
                                    
                                    })
                               
                            }).catch(function(err) {
                                console.log("Error could not get all insured contracts for ",coinbase);
                                console.log(err)
                            })
                    }) 
                }

            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
  }

export function getOwnedOffers() {
    return function (dispatch) {
        dispatch(fetchOwnedOffers())
    }
}

export function createFake() {
    return function(dispatch) {
        dispatch(fake())
    }
}

  