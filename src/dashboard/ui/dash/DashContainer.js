import React from 'react'
import { connect } from 'react-redux'
import Dash from './Dash'

/**
 * maps the dispatch actions to the relavent events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: (event) => {
          console.log("Hello")
        // dispatch(clearDash())
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
        // ownedOffers: state.dash.offers
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dash);