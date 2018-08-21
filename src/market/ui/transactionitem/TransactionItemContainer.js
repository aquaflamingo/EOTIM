import { connect } from 'react-redux'
import TransactionItem from './TransactionItem'
import {purchaseOffer} from './TransactionItemActions'

/**
 *  A wrapper component which contains an Offer Item, and 
 * provides it with the relevant details needed to instantiate.
 * */
const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.offerName,
    description: ownProps.description,
    value: ownProps.value,
    terms: ownProps.terms,
    counterParty: ownProps.counterParty,
    contractAddress: ownProps.address,
    owner: ownProps.owner,
    state: ownProps.state
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
     onInsureClick: (address,val) => {
        dispatch(purchaseOffer(address,val))
      }
    }
}
/* Connect with redux */
const  TransactionItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionItem)

export default TransactionItemContainer
