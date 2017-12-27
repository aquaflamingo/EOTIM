
import store from '../../../store'
import getWeb3 from '../../../util/web3/getWeb3'
import React from 'react'
import { connect } from 'react-redux'
import TransactionForm from './TransactionForm'



function validateTransaction(values) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
            if (values.maxInsurance>100 || values.maxInsurance<0) {
                console.error('Max insurance error...', values.maxInsurance);
                return false
            }

            // if (values.)
    } else {
        console.error('Web3 is not initialized.');
    }
}
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