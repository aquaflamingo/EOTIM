import React, { Component } from 'react'
import GridContainer from '../offersgrid/GridContainer'
import { Link } from 'react-router'

/** 
 * A more sophisticated layout for containing the relavent offers in the
 * Grid container component and managing the upper status of global 
 * statistics for offerings.
*/
class Market extends Component {
  
  constructor(props) {
    super(props)

    console.log(props)
  }



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
    console.log("Sum")
    for (var offer in offers) {
        sum+=offers[offer].val;
        console.log("Sum value is ",sum);
        console.log(offer);
    }
    return sum/offers.length;
  }

  /**
   *  Should eventually load and present the number of UNINSURED offers
  */
  offersAvail(offers) {
    var tmp = []
    for (var offer in offers) {

      if(offer.insurance===0) {
        tmp.push(offer)
      }
    }
    return tmp.length;
  }

  /**
   * Renders the Grid container with the offers, 
   * as well as a notice if there are no contract offers available.
   */
  renderOffers() {
    if (this.props.offers.length==0) {
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


    return <div> <GridContainer offers={this.props.offers} onClick={this.props.onPurchaseClick} /> </div>
  }
  render() {
    return(
            <div>
               
              <div>
                <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Deals Available</p>
                     {this.props.offers == null ? 
                    <p className="title">N/A</p>
                    :
                    <p className="title">{this.offersAvail(this.props.offers)}</p>
                     }
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Average Value</p>
                     {this.props.offers == null ? 
                    <p className="title">N/A</p>
                    :
                    <p className="title">{this.calculateAvgVal(this.props.offers).toFixed(1)} ETH</p>
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
                  this.props.offers == null ?
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