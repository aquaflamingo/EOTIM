import React, { Component } from 'react'
import { Link } from 'react-router'

class Dash extends Component {
  
  
    componentDidMount() {
      console.log("Dash component mounted")
      setTimeout(this.props.onRefresh,1000)
    }
  
    calculateSettlement(offer) {
      if (offer.state==="insured") {
        console.log("Insured contract, settlement cost: ",offer.premium*offer.trxValue*offer.maxCoverage);
        return offer.premium/100 * offer.trxValue * offer.maxCoverage/100;
      } else {
        console.log("Uninsured contract settlement cost: 0.0");
       return 0;
      }
    }
  
    renderOwnedContracts() {
      let renderItems = []
      let key=0;
      for (let offer of this.props.offers) {
      
        if (offer.state==='settled') continue;
        
        renderItems.push(
            <div className="card" key={key++}>
              <div className="card-content">
                <div className="columns">
                  <div className="column">
                    <h5 className="has-text-weight-semibold">
                    {offer.offerName}
                    </h5>
                    <label className="label">Contract Address </label>
                    <p className="is-size-7"> {offer.address} </p>
                  </div>

                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span className="tag is-success">{offer.val} ETH</span>
                      </div>

                      <div className="column">
                        <span className="tag is-warning">Max Coverage: {offer.maxCoverage}%</span>
                      </div>

                      <div className="column">
                        <span className="tag">Premium: {offer.terms}%</span>
                      </div>
                      <div className="column">
                      {
                      offer.isInsured ? 
                      <span className="tag is-info">Insured</span>
                      :
                      <span className="tag is-danger">Not Insured</span>
                      }
                      </div>
                    </div> 

                    <div className="card-footer">
                      <a href="#" className="card-footer-item" onClick={() => this.props.onSettle(offer.address,this.calculateSettlement(offer))}>
                        Settle Transaction ~({offer.isInsured ? this.calculateSettlement(offer): 0.0 } ETH)
                      </a>      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
      }
      return <div className="list">{renderItems}</div>
    }
    refresh() {
      this.props.onRefresh()
    }


    renderContractsFeed() {
      if (this.props.offers.length === 0)
        return(
            <div className="notification">
              <p> You don't own any insurance contracts. </p>
              <p> Head over to the market to <Link to="marketplace">browse.</Link></p>
            </div>
        )
      else
        return (
          this.renderOwnedContracts()
        )
            
            
    }
    render() {
        return (
          <div className="content">
          
            <h3 className="subtitle is-size-4">Owned Contracts</h3>
            {this.props.offers === null ?
              <p> Refreshing.. </p>
              :
              this.renderContractsFeed()
            }

            <h3> Debug Land </h3>
              <button href="#" className="button is-info is-medium" onClick={(ev)=>this.props.onFakeClick()}>
              Fake Transaction 
              </button>
          </div>
        )
    }
}

export default Dash;
