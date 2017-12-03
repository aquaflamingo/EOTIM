import { connect } from 'react-redux'
import OfferItem from './OfferItem'

const mapStateToProps = (state, ownProps) => {
  return {
    offerName: ownProps.offerName,
    description: ownProps.description,
    parties: ownProps.parties,
    terms: ownProps.terms,
    onClick: ownProps.onClick
  }
}

const  OfferContainer = connect(
  mapStateToProps
)(OfferItem)

export default OfferContainer
