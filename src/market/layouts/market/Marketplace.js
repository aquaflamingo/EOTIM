import React, { Component } from 'react'
import GridContainer from '../../ui/offersgrid/GridContainer'

class Marketplace extends Component {

  onPurchaseClick(address) {
    alert("Clicked purchase ");

  }
  render() {
    var offers = [
      {title:"Flippa Domain", description:"Transacting Cats4U.com Flippa Domain", parties:['Address1','Address2'], terms:0.02},
      {title:"Toronto Deed Transfer", description:"Toronto real estate deed transfer to texus", parties:['Address1','Address2'], terms:0.10},
      {title:"Treasury Bond Transfer", description:"75 year treasury bonds transfer", parties:['Address1','Address2'], terms:0.15}
    ]

    return(
      
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Marketplace</h1>
            <GridContainer 
              offers={offers}
              onClick={this.onPurchaseClick.bind(this)}/>
          </div>
        </div>
      </main>
    )
  }
}

export default Marketplace;
