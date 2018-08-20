import React, { Component } from 'react'
import FeedContainer from '../offersfeed/FeedContainer'
import { Link } from 'react-router'

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
  calculateAvgVal(offers) {
    var sum=0;
    if (offers.length===0|| isNaN(sum/offers)) return 0;

    for (var offer in offers) {
      if (!offers[offer].isInsured) { sum+=offers[offer].val; }
    }
    
    return sum/offers.length;
  }

  /**
   *  Should eventually load and present the number of UNINSURED offers
  */
  offersAvail(offers) {
    var available = 0;
    for (var offer in offers) {

      if(offers[offer].isInsured===false) {
        available++;
      }
    }
    return available;
  }



  renderSuccessNotification(txEvent) {
    
     return (
         <div className="notification is-success">
             <h4 className="title is-4">Offer insured!</h4>
             <p>
              Head over to the <Link to="/dashboard">  Dashboard</Link>  to view the status of your agreement.</p>

             <br/>
         </div>
     )
   }

  /**
   * Renders the Grid container with the offers, 
   * as well as a notice if there are no contract offers available.
   */
  renderOffers() {
    if (this.props.offers.length===0) {
        return (
            <div>
            <br/><br/><br/>
            <div className="notification is-info">
                <p> No Offers Available.. </p>
                <p> Why not <Link to="marketplace/new">create one?</Link></p>
              </div>
            </div>
        )
    }


    return <div> <FeedContainer offers={this.props.offers} onClick={this.props.onPurchaseClick} /> </div>
  }
  render() {
    return(
            <div>
              {
                // Render notification or not.
                this.props.insuranceSuccess ? 
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
                      <p className="title">{this.offersAvail(this.props.offers)}</p>
                      }
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Average Value</p>
                      {this.props.offers === null ? 
                      <p className="title">N/A</p>
                      :
                      <p className="title">{this.calculateAvgVal(this.props.offers).toFixed(3)} ETH</p>
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
              

              <div>
                {
                  this.props.offers === null ?
                  <p> Refreshing.. </p>
                :
                  this.renderOffers()
                }
              </div>
              

              </div>
            </div>
    )
  }
}

export default Market