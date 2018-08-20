import { connect } from 'react-redux'
import Dash from './Dash'
import {getOwnedOffers, createFake} from './DashActions'

/**
 * maps the dispatch actions to the relevant events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: () => {
        dispatch(getOwnedOffers())
      }, 
      onFakeClick: () => {
          dispatch(createFake());
      }
  }
}

/**
 * Maps react state object of offers to the props
 * @param {object} state 
 * @param {object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    console.log("\n\n\n inside dash container ")
    console.log("state ", state)
    console.log("\n\n\n")
    return {
        offers: state.dashboard.offers,
        settlement: state.dashboard.settlement
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dash);