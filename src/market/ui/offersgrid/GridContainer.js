import { connect } from 'react-redux'
import OfferContainer from './OfferContainer'


const GridContainer = ({ offers, onClick }) => (
    <ul>
      {offers.map(todo => (
        <OfferContainer {...offer} onClick={() => onClick(offer.address)} />
      ))}
    </ul>
  )



export default GridContainer
