import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'

import store from '../../../store'
const contract = require('truffle-contract')
export const GET_OWNER_ACCOUNTS = "GET_OWNER_ACCOUNTS"

function ownerAccountsRefreshed(offers) {
    return {
        type: GET_OWNER_ACCOUNTS,
        payload: offers
    }
}
