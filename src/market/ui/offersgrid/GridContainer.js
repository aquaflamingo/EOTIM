import React, {Component} from 'react'

import OfferContainer from '../offeritem/OfferContainer'

const GridContainer = ({ offers, onClick }) => (
  <section className="is-medium">
    <br/>
        { 
          // Error not able to render as a collection for some reason.. 
          offers.map(offer=> {
            // Insured
            if (offer.insurance===0) {
              return ;
            } else {
              return (
                  
                  <div className="no-params">
                    <OfferContainer 
                      {...offer}
                      onClick={(address,val) => onClick(address,val)} />
                    <br/>
                    </div>
              )
          }
          })
        } 
    </section>
  )



export default GridContainer
