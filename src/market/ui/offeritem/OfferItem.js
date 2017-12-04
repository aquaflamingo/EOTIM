import React from 'react'


function calculatePremium(value,terms) {
  return value*terms;
}
const OfferItem = ({ title, description, value, issuer, price, terms, onClick }) => {
  return(
      <div className="offer-item">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                   <span className="tag is-success"> {value} ETH </span>
                  </div>
              <div className="level-item">
                <h2 className="title is-4">{title} </h2>
              </div>
              
              <div className="level-right">
                <div className="level-item">
                 <span className="tag">{100*terms}% Premium</span>
                </div>
                <div className="level-item">
                  <span className="tag is-info">
                    Payout: {calculatePremium(value,terms)} ETH
                  </span>
                </div>
              </div>
              </div>
            </nav>

        <div className="columns">
          <div className="column is-9">
            <p className="subtitle is-5">{description} </p>
            <a href="#" style={{fontSize:'14px'}}>Issuer: {issuer} </a>
        </div>
        
        <div className="column is-3">
          <a href="#" className="button is-warning" onClick={(event) => onClick(event)}>Insure at {price} ETH</a>      
        </div>
        </div>
    </div>  
  )
}

export default OfferItem
