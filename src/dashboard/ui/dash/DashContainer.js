import { connect } from 'react-redux'
import Dash from './Dash'
import {getOwnedOffers, createFake,settleTransaction} from './DashActions'

/**
 * maps the dispatch actions to the relevant events
 */
const mapDispatchToProps = (dispatch) => {
    return {
      onRefresh: () => {
        console.log("Beginning owned offers retrieval..")
        dispatch(getOwnedOffers())
      }, 
      onSettle: (address,value) => {
          console.log("Beginning contract settlement on ", address, "..")
          dispatch(settleTransaction(address,value))
      },
      onFakeClick: () => {
          console.log("Beginning fake contract creation..")
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
    return {
        offers: state.dashboard.offers
    }
}

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dash);