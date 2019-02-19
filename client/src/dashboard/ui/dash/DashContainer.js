import { connect } from 'react-redux'
import Dash from './Dash'
import {getOwnedOffers} from './DashActions'

/**
 * maps the dispatch actions to the relevant events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: () => {
        dispatch(getOwnedOffers())
      } 
    // DEBUGGING ONLY
    //   onFakeClick: () => {
    //       dispatch(createFake());
    //   }
  }
}

/**
 * Maps react state object of offers to the props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    return {
        offers: state.dashboard.offers,
        settlement: state.dashboard.settlement
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dash);