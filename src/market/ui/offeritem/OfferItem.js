import React from 'react'


/**
 * The basis of the application is contained in an "OfferItem"
 * The offer item is passed it's relv. detail to display to to the user.
 */
const OfferItem = ({ 
  offerName, 
  description, 
  val, 
  maxCoverage, 
  terms, 
  counterParty, 
  isInsured,
  contractAddress,
  owner, 
  onClick }) => {
    
  return(
      <div className="card">
        <div className="card-content offer-item">
            <nav className="level">
              <div className="level-left">
                   <div className="level-item">
                      {isInsured ? 
                      <span className="tag is-success is-large"> Insured </span>  
                      :
                      null
                      }
                    </div>
              </div>

                  <div className="level-right">
                      <div className="level-item">
                        <span className="tag is-success"> Transaction Value: {val} ETH </span>
                      </div>
                    
                      <div className="level-item">
                        <span className="tag is-warning"> Coverage: {maxCoverage}% </span>  
                      </div>
                    <div className="level-item">
                      <span className="tag">Premium: {parseInt(terms,2)}% </span>
                    </div>
                  
                    <div className="level-item">
                        <span className="tag is-info">
                          Payout: {(val*terms/100)} ETH
                        </span>
                    </div>
                  </div>
              </nav>
            <h2 className="title is-4">{offerName} </h2>

            <div className="columns">
              <div className="column is-9">
                <p className="subtitle is-5">{description} </p>
                <label className="label">Contract Address</label>
                <a href={"https://ethplorer.io/address/"+contractAddress}> {contractAddress}</a>
            </div>
          
            </div>
            <div className="card-footer">
            {isInsured ? 
             null
              :
              <a href="#" className="card-footer-item" onClick={(event) => onClick(contractAddress,val*maxCoverage/100)}>Insure for {val*maxCoverage/100} ETH</a>      
            }
                
                <a href="#" className="card-footer-item" onClick={(event) => alert("Owner address is " + owner + ".")}>Contact</a>
              </div>
      </div>  
    </div>
  )
}

export default OfferItem
