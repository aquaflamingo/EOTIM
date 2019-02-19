import { connect } from 'react-redux'
import TransactionItem from './TransactionItem'
import {purchaseOffer,errorInsuringOffer} from './TransactionItemActions'

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
       try {
          dispatch(purchaseOffer(address,val))
       } catch(e) {
          alert(`Error purchasing offer. ${e.message}`)
       }      
      }
    }
}
/* Connect with redux */
const  TransactionItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionItem)

export default TransactionItemContainer
