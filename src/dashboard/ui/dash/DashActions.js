import store from '../../../store'
import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')
import {fetchOfferDetails, fakeCreateTransaction} from '../../../util/contractUtils'


export const GET_OWNED_OFFERS = "GET_OWNED_OFFERS"
export const OFFER_SETTLED = "OFFER_SETTLED"

function offerSettled(status) {
    return {
        type: OFFER_SETTLED,
        payload: status
    }
}

function ownedOffersRefreshed(offers) {
    return {
        type: GET_OWNED_OFFERS,
        payload: offers
    }
}

function settleTransactionFor(address,value) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((error, coinbase) => {
                if (error) {
                    console.error("Error getting coinbase ", error);
                } else {
                    const trxn = contract(Transaction)
                    trxn.setProvider(web3.currentProvider)
                    let ethVal = web3.toWei(parseFloat(value),'ether');
                    console.log("Attempting to settle contract ", address, " at ", ethVal,"ETH  on behalf of ", coinbase);
                    trxn.at(address)
                        .then((instance) => {
                            let event_settlement = instance.TransactionStatusChange()
                            event_settlement.watch((error,result) => {
                                if(!error) {
                                    console.log("Settlement Success Event ", result)
                                } else {
                                    console.log("Error: ", error)
                                }
                            })
                            console.log(instance);
                            instance.settle({from:coinbase,value:ethVal})
                                .then((res)=> { 
                                    console.log("Success, contract ", address, " settled..");
                                    dispatch(offerSettled(res));
                                }).catch((err)=> {
                                    console.log("Failed to settle contract ", address, "...");
                                    console.log(err);
                                })
                        })
                        .catch((error)=> {
                            console.log("Could not get transaction.. ", error);
                        })
                }
            })

        }
    } else {
        console.log("Error Web3 Not Initialized..")
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

export function settleTransaction(address,value) {
    return function(dispatch) {
        dispatch(settleTransactionFor(address,value))
    }
}

export function createFake() {
    return function(dispatch) {
        dispatch(fake())
    }
}

  