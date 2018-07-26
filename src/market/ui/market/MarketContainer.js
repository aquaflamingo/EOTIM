import React from 'react'
import { connect } from 'react-redux'
import {purchaseOffer} from '../offeritem/OfferActions'
import {refreshOffers,clearOffers} from './MarketActions'
import Market from './Market'

/**
 * maps the dispatch actions to the relavent events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onPurchaseClick: (address,val) => {
        dispatch(purchaseOffer(address,val))
      },
      onRefresh: (event) => {
        // event.preventDefault();
        dispatch(clearOffers())
        dispatch(refreshOffers())
     }
  }
}

/**
 * Maps react state object of offers to the props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    return {
        offers: state.market.offers
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Market);