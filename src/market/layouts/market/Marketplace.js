import React, { Component } from 'react'
import GridContainer from '../../ui/offersgrid/GridContainer'
import AsideMenu from '../../../ui/AsideMenu'


class Marketplace extends Component {

  onPurchaseClick(address) {
    alert("Clicked purchase ");

  }
  render() {
    var offers = [
      {title:"Flippa Domain", value: 2.3, price: 0.01, description:"Transacting Cats4U.com Flippa Domain", parties:['Address1','Address2'], terms:0.02},
      {title:"Toronto Deed Transfer", value: 5, price: 0.41, description:"Toronto real estate deed transfer to texus", parties:['Address1','Address2'], terms:0.10},
      {title:"Treasury Bond Transfer", value: 1.1, price: 1.02, description:"75 year treasury bonds transfer", parties:['Address1','Address2'], terms:0.15}
    ]

    return(
      <div className="container">
      <br/><br/>
        <div className="columns">
          <div className="column is-3">
            <AsideMenu />
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
