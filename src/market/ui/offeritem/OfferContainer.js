import { connect } from 'react-redux'
import OfferItem from './OfferItem'

/**
 *  A wrapper component which contains an Offer Item, and 
 * provides it with the relevant details needed to instantiate.
 * */
const mapStateToProps = (state, ownProps) => {
  return {
    offerName: ownProps.offerName,
    description: ownProps.description,
    value: ownProps.value,
    terms: ownProps.terms,
    counterParty: ownProps.counterParty,
    contractAddress: ownProps.address,
    owner: ownProps.owner,
    onClick: ownProps.onClick,
    insuranceStatus: ownProps.isInsured
  }
}

/* Connect with redux */
const  OfferContainer = connect(
  null,
  mapStateToProps
)(OfferItem)

export default OfferContainer
