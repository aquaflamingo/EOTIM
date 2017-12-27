import {reduxForm} from 'redux-form';
import React from 'react'
import { connect } from 'react-redux'
import TransactionForm from './TransactionForm'
// import actions


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (event) => {
          alert("Hello world")
        // dispatch(fundTransaction())
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