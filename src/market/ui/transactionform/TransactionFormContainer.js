
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
            console.log(event)
          alert(event)
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