import Transaction from 'contracts/Transaction.json'
import InsurableTransactionFactory from 'contracts/InsurableTransactionFactory.json'

import store from 'store'
const contract = require('truffle-contract')
const UNINSURED = 0;
const INSURED = 1;
const SETTLED = 2;

/**
   * Determines whether or not the status is insured or not
   * @param {string} status 
   */
export function isInsured(status) {
    if (status==="0x0000000000000000000000000000000000000000") {
      return false;
    } 
    return true;
  }

/**
 * Parses the state of a 
 */
export function getState(state) {
  switch(state) {
    case UNINSURED:
      return "uninsured"
    case INSURED:
      return "insured"
    case SETTLED:
      return "settled"
    default:
      return null;
  }
}

/**
 * Create a set of promises to iterate through and grab relevant contract
 * Then converts these contracts into individual details objects (representing offers)
 * for consumption
 * @param {array} offerAddresses 
 */
export function fetchOfferDetails(offerAddresses) {
    let web3 = store.getState().web3.web3Instance
    let trxn = contract(Transaction)
    trxn.setProvider(web3.currentProvider)
    let getDetails = function getDetails(address) {
      return new Promise((resolve,reject)=>{
        trxn.at(address)
        // Get contract at the specific address and call it's details
          .then((instance)=> {
            instance.getTransactionDetails.call()
            .then((results) =>{
                // resolve promise successfully
                  const details = parseTransactionDetails(address,results,web3)
                  resolve(details)
              })
              .catch(function(err) {
                // reject promise.. error
                reject(err)
            })
        })
      })
    }
    let actions = offerAddresses.map(getDetails)
    // Call all promises and then publish results. 
    let results = Promise.all(actions)
    return results;
  }

export function parseTransactionDetails(address,results,web3) {
  return {
    address:address,
    offerName: web3.toAscii(results[0]),
    description: web3.toAscii(results[1]),
    val: web3.fromWei(results[2],'ether').toNumber(),
    maxCoverage:  results[4].toNumber(),
    terms: results[5].toNumber(),
    counterParty: results[6],
    isInsured: isInsured(results[7]),
    state: getState(results[8].toNumber()),
    owner: results[9],
    balance: results[10].toNumber()
  }
}
