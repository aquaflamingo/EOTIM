import React, { Component } from 'react'
import MarketMenu from '../../../ui/MarketMenu'
import MarketContainer from '../../ui/market/MarketContainer'

class Marketplace extends Component {

  onPurchaseClick(address) {
    alert("Clicked purchase ");

  }
    
  render() {
    
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
            <h1 className="title">Open Offers </h1>
            <MarketContainer/>
          </div>
       </div>
    </div>
    )
  }
}

export default Marketplace;
