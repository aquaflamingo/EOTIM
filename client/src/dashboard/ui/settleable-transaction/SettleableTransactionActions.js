import Transaction from './contracts/Transaction.json'
import store from './store'

const contract = require('truffle-contract')

export function settleTransaction(address,value) {
    return function(dispatch) {
        dispatch(settleTransactionFor(address,value))
    }
}

export const OFFER_SETTLED = "OFFER_SETTLED"

/* Update state as offer settled*/
function offerSettled(settlement) {
    return {
        type: OFFER_SETTLED,
        payload: settlement
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
                    console.log("Attempting to settle contract", address, "\nat:", ethVal,"ETH\non behalf of ", coinbase);
                    trxn.at(address)
                        .then((instance) => {
                            let event_settlement = instance.TransactionStatusChange()
                            event_settlement.watch((error,result) => {
                                if(!error) {
                                    console.log("TransactionStatusChange on:", address, "\nReports: \n",result.args.message)
                                } else {
                                    console.log("Error: ", error)
                                }
                            })
                            instance.settle({from:coinbase,value:ethVal})
                                .then((res)=> { 
                                    var settlement = {tx:res,status:true}
                                    console.log("Reuslt of ", res);
                                    dispatch(offerSettled(settlement));
                                }).catch((err)=> {
                                    console.log("Failed to settle contract ", address, "...");
                                    var settlement = {error:err,status:false}
                                    dispatch(offerSettled(settlement));
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
