import React, { Component } from 'react'
import { Link } from 'react-router'

class Dash extends Component {
  
    constructor(props) {
      super(props)
    }
  
  
  
    componentDidMount() {
      console.log("Dash component mounted")
      setTimeout(this.props.onRefresh,1000)
    }
  
  
    renderOwnedContracts() {
      let renderItems = []
      for (let offer of this.props.offers) {
      
        renderItems.push(
            <div className="card">
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
                      <a href="#" className="card-footer-item" onClick={(event) => alert("Transaction would be settled!")}>
                        Settle Transaction ({offer.isInsured ? offer.terms*offer.maxCoverage*offer.val : 0.0 } ETH)
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

    render() {
        return (
          <div className="content">
           
            {this.props.offers === null ? 
            null
            :
            <div>
            <h3 className="subtitle is-size-4">Owned Contracts</h3>
              {this.renderOwnedContracts()}
            </div>
            }
            
         

          </div>
        )
    }
}

export default Dash;

 {/* <p> Coinbase: {this.props.coinbase} </p> */}
//  <div className="notification">
//  <p> Nothing to see here. </p>
//  <p> Head over to the market to <Link to="marketplace">browse.</Link></p>
// </div>