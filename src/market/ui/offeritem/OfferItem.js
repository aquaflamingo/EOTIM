import React, {Component} from 'react'


function calculatePremium(val,terms) {

  return val*terms;
}

/**
 * The basis of the application is contained in an "OfferItem"
 * The offer item is passed it's relv. detail to display to to the user.
 */
const OfferItem = ({ offerName, description, val, maxCoverage, terms, counterParty, contractAddress, onClick }) => {

  return(
      <div className="panel offer-item">
          <nav className="level">
            <div className="level-left">
            
              <div className="level-item">
                   <span className="tag is-success"> {val} ETH </span>
                  </div>

              <div className="level-right">
                <div className="level-item">
                 <span className="tag">{parseInt(terms)}% Premium</span>
                </div>
                <div className="level-item">
                  <span className="tag is-info">
                    Payout: {calculatePremium(val,terms/100)} ETH
                  </span>
                </div>
              </div>
              </div>
            </nav>
          <h2 className="title is-4">{offerName} </h2>
          

        <div className="columns">
          <div className="column is-9">
            <p className="subtitle is-5">{description} </p>
            <a href={"https://ethplorer.io/address/"+contractAddress}> {contractAddress}</a>
        </div>
        
        <div className="column is-3">
          <a href="#" className="button is-warning" onClick={(event) => onClick(contractAddress,val*maxCoverage/100)}>Insure at {val*maxCoverage/100} ETH</a>      
        </div>
        </div>
    </div>  
  )
}

export default OfferItem
