import React, { Component } from 'react'
import GridContainer from '../../ui/offersgrid/GridContainer'
import MarketMenu from '../../../ui/MarketMenu'


class Marketplace extends Component {

  onPurchaseClick(address) {
    alert("Clicked purchase ");

  }
  render() {
    var offers = [
      {title:"Flippa Domain", value: 2.3, price: 0.01, description:"Transacting Cats4U.com Flippa Domain", terms:0.02, issuer:"0xf17f52151EbEF6C7334FAD080c5704D77216b732"},
      {title:"Toronto Deed Transfer", value: 5, price: 0.41, description:"Toronto real estate deed transfer to texus", terms:0.10, issuer:"0x17f5f2D080c57b7321504D772161EbEF6C7334FA"},
      {title:"Treasury Bond Transfer", value: 1.1, price: 1.02, description:"75 year treasury bonds transfer", terms:0.15,issuer:"0x1c57b7347f5f2D081EbEF6C730D1501634FA7722"}
    ]
    
    var links = [
      {to:'/marketplace',name:'All Escrows'},
      {to:'/marketplace/new',name:'Create Escrow'},
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
            <GridContainer 
              offers={offers}
              onClick={this.onPurchaseClick.bind(this)}/>
            </div>
       </div>
    </div>
    )
  }
}

export default Marketplace;
