import React from 'react'


/**
 * The basis of the application is contained in an "OfferItem"
 * The offer item is passed it's relv. detail to display to to the user.
 */
const SettleableTransaction = ({ 
  name, 
  val, 
  maxCoverage, 
  terms, 
  state,
  address,
  handleSettlement,
  settlementCost}) => {
    return (
    <div className="card card-feed-item">
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <h5 className="has-text-weight-semibold">
                      {name}
                      </h5>
                      <label className="label">Contract Address </label>
                      <p className="is-size-7"> {address} </p>
                    </div>

                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <span className="tag is-success">{val} ETH</span>
                        </div>

                        <div className="column">
                          <span className="tag is-warning">Max Coverage: {maxCoverage}%</span>
                        </div>

                        <div className="column">
                          <span className="tag">Premium: {terms}%</span>
                        </div>
                        <div className="column">
                        {
                        state==="insured" ? 
                          <span className="tag is-success">Insured</span>
                          :
                          <span className="tag is-danger">Uninsured</span>
                        }
                        </div>
                      </div> 

                      <div className="card-footer">
                        <a href="#" className="card-footer-item" onClick={() => handleSettlement(address,settlementCost)}>
                          Settle Transaction ~({state==="insured" ? settlementCost: 0.0 } ETH)
                        </a>      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default SettleableTransaction;