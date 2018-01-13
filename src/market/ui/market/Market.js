import React, { Component } from 'react'
import GridContainer from '../offersgrid/GridContainer'
import { Link } from 'react-router'

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

    console.log("Hello world", this.props.offers)

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
                    <p className="title">{this.props.offers.length}</p>
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
              </nav>
              

              <div>
              <a href="#" onClick={this.refresh.bind(this)}> Refresh </a>
              {this.props.offers == null ?
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