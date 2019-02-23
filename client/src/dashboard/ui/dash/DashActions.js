import store from 'store'
import InsurableTransactionFactory from 'contracts/InsurableTransactionFactory.json'
import {fetchOfferDetails} from 'util/contractUtils'
const contract = require('truffle-contract')
export const GET_OWNED_OFFERS = "GET_OWNED_OFFERS"


function ownedOffersRefreshed(offers) {
    return {
        type: GET_OWNED_OFFERS,
        payload: offers
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
                        instance.getContractsOwnedBy.call(coinbase)
                            .then(function(result) {
                                fetchOfferDetails(result)
                                    .then(function(data){
                                        console.log("Success getting all insured transactions : ", data);
                                        dispatch(ownedOffersRefreshed(data))
                                    })
                            }).catch(function(err) {
                                console.log("Error could not get all insured contracts for ",coinbase);
                                let data = [];
                                dispatch(ownedOffersRefreshed(data))
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


// export function createFake() {
//     return function(dispatch) {
//         dispatch(fake())
//     }
// }

  