import Transaction from '../../build/contracts/Transaction.json'

import store from '../store'
const contract = require('truffle-contract')

/**
   * Determines whether or not the status is insured or not
   * @param {string} status 
   */
export function isInsured(status) {
    if (status=="0x0000000000000000000000000000000000000000") {
      return false;
    } 

    return true;
  }

/**
 * Create a set of promises to iterate through and grab relavent contract
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
            .then(function(results) {
                // resolve promise successfully

                  var details = {
                    address:address,
                    offerName: web3.toAscii(results[0]),
                    description: web3.toAscii(results[1]),
                    val: web3.fromWei(results[2],'ether').toNumber(),
                    maxCoverage:  results[4].toNumber(),
                    terms: results[5].toNumber(),
                    counterParty: results[6],
                    isInsured: isInsured(results[7]),
                    owner: results[9]
                  }
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