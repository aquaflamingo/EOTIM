import React, {Component} from 'react'

import OfferContainer from '../offeritem/OfferContainer'

const GridContainer = ({ offers, onClick }) => (
  <section className="section is-medium">
        { 
          // Error not able to render as a collection for some reason.. 
          offers.forEach((offer,i)=> (
              <div>
                <OfferContainer 
                  {...offer} 
                  key={i} 
                  onClick={() => onClick(offer.address)} />
                <br/>
                </div>
          ))
        } 
    </section>
  )



export default GridContainer
