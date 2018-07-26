import React, {Component} from 'react'

import OfferContainer from '../offeritem/OfferContainer'

/**
 * Grid container creates the list of offers - eventually to become a grid based 
 * component but for now lists in one row.
 */
const GridContainer = ({ offers, onClick }) => (
  <section className="is-medium">
    <br/>
        { 
          offers.length != 0 ?
            
            // Error not able to render as a collection for some reason.. 
            offers.map(offer=> {
              // if it's insured don't render to screen.
              if (offer.isInsured===true) {
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
           :
            <div className="notification is-danger">
              <h3 className="title is-5"> No Open Offers. </h3>
              <p> There are currently no open offers available on the Marketplace. Please check back at another time. </p>
              <br/>
            </div>
        } 
    </section>
  )



export default GridContainer
