import store from '../../../store'
export const GET_OWNED_OFFERS = "GET_OWNED_OFFERS"

function ownedOffersRefreshed(offers) {
    return {
        type: GET_OWNED_OFFERS,
        payload: offers
    }
}

// TODO copy the market action similar "fetchdetails" function but this time
// use the created function in the factory contract to rerieve the addresses of all the
// contracts that belong to the ownerAddress then do Promise calls for Trx Details on each. 


function fetchOwnedOffers(ownerAddress) {
    let web3 = store.getState().web3.web3Instance
    let trxn = contract(Transaction)

  }