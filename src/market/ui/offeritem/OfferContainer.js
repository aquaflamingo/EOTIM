import { connect } from 'react-redux'
import OfferItem from './OfferItem'

const mapStateToProps = (state, ownProps) => {
  console.log("Own props are ", ownProps)
  return {
    offerName: ownProps.offerName,
    description: ownProps.description,
    value: ownProps.value,
    terms: ownProps.terms,
    counterParty: ownProps.counterParty,
    contractAddress: ownProps.address,
    onClick: ownProps.onClick
  }
}

const  OfferContainer = connect(
  null,
  mapStateToProps
)(OfferItem)

export default OfferContainer
