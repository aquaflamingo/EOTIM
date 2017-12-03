import React, {Component} from 'react'

import OfferContainer from '../offeritem/OfferContainer'


const GridContainer = ({ offers, onClick }) => (
  <div className="grid-container">
      <div className='offer-container'>
        {offers.map(offer => (
          <OfferContainer {...offer} onClick={() => onClick(offer.address)} />
        ))}
      </div>
    </div>
  )



export default GridContainer
