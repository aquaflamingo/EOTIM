import React, { Component } from 'react'
import MarketMenu from '../../../ui/MarketMenu'
import MarketContainer from '../../ui/market/MarketContainer'

/** 
 * Basic dumb wrapper layout for the market section of the app, containing the menu and offers
*/
class Marketplace extends Component {

  /* Woo hoo clicking the offer purchase works!*/
  onPurchaseClick(address) {
    alert("Clicked purchase ");

  }
    
  render() {
    
    /* Links in relavent side nav */
    var links = [
      {to:'/marketplace',name:'All'},
      {to:'/marketplace/new',name:'Create Transaction'},
      {to:'/marketplace/search',name:'Search Transaction'},
    ]
    return(
      <div className="container">
      <br/><br/>
        <div className="columns">
          <div className="column is-3">
            <MarketMenu
              title="Marketplace"
              links={links} />
            </div>
          <div className="column is-9">
            <h1 className="title">Offers</h1>
            <MarketContainer/>
          </div>
       </div>
    </div>
    )
  }
}

export default Marketplace;
