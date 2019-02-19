import Transaction from './contracts/Transaction.json'
import store from './store'
export const REFRESH_OFFERS = "REFRESH_OFFERS"
import {parseTransactionDetails} from "./util/contractUtils"


const contract = require('truffle-contract')

export const INSURE_TRANSACTION = 'INSURE_TRANSACTION'

/* Used to udpate redux store */
function insuredTransaction(address) {
  return {
    type: INSURE_TRANSACTION,
    payload: address
  }
}

/**
 * An action to allow individual users to purchase the offer presented in the offer box
 * */ 
export async function purchaseOffer(address,val) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
       // Get current ethereum wallet.
       web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) console.error("error ", error);
      

        console.log("A purchase order has been executed on the offer ",address," for the value of ", val) 

        // Grab transaction contract & set provider
        const trxn = contract(Transaction)
        trxn.setProvider(web3.currentProvider)

        /* Grab the transaction at the address provided in the purchase offer function */
        trxn.at(address)
          .then((instance)=> {
            /* Watch for transaction insurance event */
            var inst = instance.TransactionStatusChange();
            setStatusChangeWatcher(inst)
            instance.getTransactionDetails().then((res)=>{
              var ethVal = web3.toWei(val,'ether');
              console.log("About to insure for..", ethVal, " wei");
              
              instance.insure({from:coinbase,value:ethVal})
                    .then((results) => {
                        dispatch(insuredTransaction(results))
                      })
                      .catch((err) => {
                        console.log("Error this contract cannot be insured...", err)
                    })
              })
            }).catch((err)=>{
                console.error(`Unable to insure contract ${err}.`)
            })
        })
      }
  } else {
    console.error('Web3 is not initialized.');
  }
}


function setStatusChangeWatcher(instance) {
  instance.watch((error, result) => {
    if (!error)
    {
        console.log("! Transaction Status Change:\n", result.args.message)
    } else {
        // Error
        console.log("Failed to insure contract")
        console.log(error);
    }
  })
}