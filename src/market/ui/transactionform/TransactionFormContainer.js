
import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from './TransactionFormActions'
import TransactionForm from './TransactionForm'


/**
 * Maps the state objects to props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    return {
        createContract: state.market.createContract
    }
}

/**
 * Handles dispatching action for redux state
 * @param {object} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (values) => {
            dispatch(createTransaction(values))
      }
    }
  }
  
/**
 * Basic container for connecting
 */
const TransactionFormContainer = ({handleTransactionSubmit,createContract}) =>
    <TransactionForm 
        createContract={createContract}
        onSubmit={values => handleTransactionSubmit(values)}/>
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionFormContainer);