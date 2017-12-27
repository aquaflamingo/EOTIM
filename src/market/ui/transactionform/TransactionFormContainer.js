
import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from './TransactionFormActions'
import TransactionForm from './TransactionForm'

// import actions


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (values) => {
        console.log(event)
        dispatch(createTransaction(values))
      }
    }
  }
  
const TransactionFormContainer = ({handleTransactionSubmit,values}) =>
    <TransactionForm 
        onSubmit={values => handleTransactionSubmit(values)}/>
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionFormContainer);