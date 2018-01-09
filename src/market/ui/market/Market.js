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

    return <GridContainer offers={this.props.offers} onClick={this.props.onPurchaseClick} />;
  }
  render() {
    return(
            <div>
              <a href="#" onClick={this.refresh.bind(this)}> Refresh </a>
              {this.props.offers == null ?
                <p> Refreshing.. </p>
              :
                this.renderOffers()
              }
              
            </div>
    )
  }
}

export default Market