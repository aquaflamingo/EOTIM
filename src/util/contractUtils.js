import Transaction from '../../build/contracts/Transaction.json'
import InsurableTransactionFactory from '../../build/contracts/InsurableTransactionFactory.json'

import store from '../store'
const contract = require('truffle-contract')
const UNINSURED = "0x0000000000000000000000000000000000000000";
const INSURED = "0x0000000000000000000000000000000000000001"
const SETTLED = "0x0000000000000000000000000000000000000002"

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
  console.log("State is ",state)
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
            .then((results) =>{
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
                    owner: results[9],
                    state: getState(results[7])
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

export function fakeCreateTransaction() {
    let web3 = store.getState().web3.web3Instance;
    const factory = contract(InsurableTransactionFactory)
    factory.setProvider(web3.currentProvider)

    let fake = () => {
      return new Promise((resolve,reject) => {
        var factoryInstance

        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
                console.error(error);
            }
            
            // Get current ethereum wallet.
            factory.deployed().then(function(instance) {
                factoryInstance = instance
                
    

                var ethVal = web3.toWei(parseFloat(0.002),'ether');
                
                factoryInstance.create(
                    "0xC257274276a4E539741Ca11b590B9447B26A8051",
                    "Mexico Orange Shipment",
                    20,
                    "Need freight insurance",
                    1,
                    {from:coinbase, value:ethVal})
                .then(function(result) {
                    resolve(result)
                    console.log("Fake Contract Created!! ", result)
                })
                .catch(function(err) {
                    console.log(err)
                    reject(err)
                // If error...
                })
                
            })
        })
      })
    }
    return new Promise(fake);
}
