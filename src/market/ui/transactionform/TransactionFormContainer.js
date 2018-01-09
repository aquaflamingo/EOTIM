
import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from './TransactionFormActions'
import TransactionForm from './TransactionForm'


const mapStateToProps = (state, ownProps) => {
    console.log("TransactionFormContainer state2props ",state.market.status)
    return {
        status: state.market.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (values) => {
            dispatch(createTransaction(values))
      }
    }
  }
  
const TransactionFormContainer = ({handleTransactionSubmit,values,status}) =>
    <TransactionForm 
        status={status}
        onSubmit={values => handleTransactionSubmit(values)}/>
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionFormContainer);