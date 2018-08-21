import React, { Component } from 'react'
import FeedContainer from '../offersfeed/FeedContainer'
import BasicNotification from '../../../ui/BasicNotification'


let filterState = "Uninsured"

/** 
 * A more sophisticated layout for containing the relavent offers in the
 * Grid container component and managing the upper status of global 
 * statistics for offerings.
*/
class Market extends Component {

  componentDidMount() {
    console.log("Market component mounted")
    setTimeout(this.props.onRefresh,1000)
  }


  refresh() {
    this.props.onRefresh()
  }

  /**
   * Used to calculate the average value per insurance offering
   * */ 
  calculateAverageUninsuredValueVal(offers) {
    if (offers.length===0) return 0;
    let unInsuredOffers = offers.filter((offer)=>{return offer.state==="uninsured"});
    if (unInsuredOffers.length===0) return 0;
    let sum = unInsuredOffers.reduce((acc,offer)=>{return acc+offer.val},0);
    return sum/unInsuredOffers.length;
  }

  /**
   *  Should eventually load and present the number of UNINSURED offers
  */
  offersAvailable(offers) {
    return offers.filter((offer)=>{return offer.state==="uninsured"}).length
  }

  renderSuccessNotification(txEvent) {
     return (
       <BasicNotification 
          title="👌 Offer insured!"
          color="is-success"
          description="Head over to the the Dashboard to view the status of your agreement."
          />
     )
   }

  /**
   * Renders the Grid container with the offers, 
   * as well as a notice if there are no contract offers available.
   */
  renderUninsuredOffers() {
    
    if (this.props.offers.length===0) {
        return (
          <BasicNotification 
            title="😕 No Offers Available.."
            color=""
            description="Why not create one ?"
            />
        )
    }

    
    // Perhaps filtering in the future
    
    let offers = this.props.offers.filter((offer)=>{return offer.state==="uninsured"})
    console.log("Rendering Offers ", offers)
    return <div> <FeedContainer offers={offers} /> </div>
  }
  render() {
    return(
            <div>
              {
                // Render notification or not.
                this.props.purchaseStatus ? 
                this.renderSuccessNotification():null
              }

              <div>
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Open Offers Available</p>
                      {this.props.offers === null ? 
                      <p className="title">N/A</p>
                      :
                      <p className="title">{this.offersAvailable(this.props.offers)}</p>
                      }
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Average Value</p>
                      {this.props.offers === null ? 
                      <p className="title">N/A</p>
                      :
                      <p className="title">{this.calculateAverageUninsuredValueVal(this.props.offers).toFixed(3)} ETH</p>
                      }
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Hosted Contracts</p>
                      {this.props.offers === null ? 
                      <p className="title">N/A</p>
                      :
                      <p className="title">{this.props.offers.length}</p>
                      }
                    </div>
                  </div>
                  <div className="level-item">
                    <a href="#" onClick={this.refresh.bind(this)}> 
                      Refresh
                    </a>
                  </div>
              </nav>
        
              <div className="offers-feed">
                {
                  this.props.offers === null ?
                  <p> Refreshing.. </p>
                :
                <div>
                   { this.renderUninsuredOffers()}
                    <br/>
                    <p className='has-text-centered'>Results Filtered By:   <strong>{filterState}</strong></p>
                  </div>
                }
              </div>
              </div>
            </div>
    )
  }
}

export default Market