import React from 'react'


/**
 * The basis of the application is contained in an "OfferItem"
 * The offer item is passed it's relv. detail to display to to the user.
 */
const SettleableTransaction = ({ 
  offerName, 
  val, 
  maxCoverage, 
  terms, 
  isInsured,
  address,
  handleSettlement,
  settlementCost}) => {
    return (
    <div className="card card-feed-item">
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <h5 className="has-text-weight-semibold">
                      {offerName}
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
                        isInsured ? 
                        <span className="tag is-info">Insured</span>
                        :
                        <span className="tag is-danger">Not Insured</span>
                        }
                        </div>
                      </div> 

                      <div className="card-footer">
                        <a href="#" className="card-footer-item" onClick={() => handleSettlement(address,val)}>
                          Settle Transaction ~({isInsured ? settlementCost: 0.0 } ETH)
                        </a>      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default SettleableTransaction;