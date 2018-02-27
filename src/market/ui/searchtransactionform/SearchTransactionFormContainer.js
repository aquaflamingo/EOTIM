
import React from 'react'
import { connect } from 'react-redux'
import SearchTransactionForm from './SearchTransactionForm'


/**
 * activated with values to pass to search
 * @param {object} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        handleTransactionSubmit: (values) => {
            console.log(event)
            console.log("Submitted query ", values)
      }
    }
  }

const SearchTransactionFormContainer = ({handleTransactionSubmit,values}) =>
    <SearchTransactionForm 
        onSubmit={values => handleTransactionSubmit(values)}/>
  
export default connect(
    mapDispatchToProps
  )(SearchTransactionFormContainer);