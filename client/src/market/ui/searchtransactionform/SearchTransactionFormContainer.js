
import React from 'react'
import { connect } from 'react-redux'
import SearchTransactionForm from './SearchTransactionForm'
import {lookupTransaction} from './market/ui/transactionform/TransactionFormActions'

/**
 * Maps the state objects to props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
 
    return {
        searchContract: state.market.searchContract
    }
}

/**
 * activated with values to pass to search
 * @param {object} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (values) => {
            dispatch(lookupTransaction(values.searchQuery))
      },
      onPurchaseClick: (address,val) => {
          console.log("Purchase click: ",address,val)
        // dispatch(purchaseOffer(address,val))
        
      },
    }
  }

const SearchTransactionFormContainer = ({handleTransactionSubmit,values,searchContract, onPurchaseClick}) =>
    <SearchTransactionForm 
        searchContract={searchContract}
        onSubmit={values => handleTransactionSubmit(values)}
        onClick={(address,val)=> onPurchaseClick(address,val)}
        />
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchTransactionFormContainer);