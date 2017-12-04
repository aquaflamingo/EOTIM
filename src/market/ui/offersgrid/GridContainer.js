import React, {Component} from 'react'

import OfferContainer from '../offeritem/OfferContainer'

const GridContainer = ({ offers, onClick }) => (
  <section class="section is-medium">
        { 
          
          offers.map(offer => (
              <div>
              <OfferContainer {...offer} onClick={() => onClick(offer.address)} />
              <br/>
              <br/>
              </div>
        ))
        } 
    </section>
  )



export default GridContainer
