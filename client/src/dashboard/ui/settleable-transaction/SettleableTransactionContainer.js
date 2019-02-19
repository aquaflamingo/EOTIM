import React from 'react'
import { connect } from 'react-redux'
import {settleTransaction} from './SettleableTransactionActions'
import SettleableTransaction from './SettleableTransaction'


const calculateSettlement = (offer) => {
      if (offer.state==="insured") {
        console.log("INSURED SETTLEMENT COST: ",offer.terms/100*offer.val*offer.maxCoverage/100);
        return offer.terms/100 * offer.val * offer.maxCoverage/100;
      } else {
        console.log("UNINSURED SETTLEMENT COST: 0.0");
       return 0;
      }
}
/**
 * Maps the state objects to props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    let cost  = calculateSettlement(ownProps.offer);
    return {
        name: ownProps.offer.offerName,
        val: ownProps.offer.val,
        terms: ownProps.offer.terms,
        maxCoverage: ownProps.offer.maxCoverage,
        address: ownProps.offer.address,
        settlementCost: cost,
        state: ownProps.offer.state,
        props: ownProps
    }
}

/**
 * Handles dispatching action for redux state
 * @param {object} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        handleSettlement: (address,value) => {
            dispatch(settleTransaction(address,value))
      }
    }
  }
  
/**
 * Basic container for connecting
 */
const SettleableTransactionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettleableTransaction);

  export default SettleableTransactionContainer;