import React from 'react'
import { connect } from 'react-redux'
import Dash from './Dash'
import {getOwnedOffers} from './DashActions'

/**
 * maps the dispatch actions to the relavent events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: () => {
        dispatch(getOwnedOffers())
        // dispatch(refreshDash())
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
        offers: state.dashboard.offers
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dash);