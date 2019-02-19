import { connect } from 'react-redux'
import {refreshOffers,clearOffers} from './MarketActions'
import Market from './Market'

/**
 * maps the dispatch actions to the relavent events
 */
const mapDispatchToProps = (dispatch) => {
    return {
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
        offers: state.market.offers,
        purchaseStatus: state.market.purchaseStatus
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Market);