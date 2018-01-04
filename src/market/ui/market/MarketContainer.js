import React from 'react'
import { connect } from 'react-redux'
import {purchaseOffer} from '../offeritem/OfferActions'
import {refreshOffers} from './MarketActions'
import Market from './Market'

const mapDispatchToProps = (dispatch) => {
    return {
      onPurchaseClick: (event) => {
        event.preventDefault();
        dispatch(purchaseOffer())
      },
      onRefresh: (event) => {
        // event.preventDefault();
        console.log("onRefresh.. dispatching")
        dispatch(refreshOffers())
     }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        offers: state.market.offers
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Market);