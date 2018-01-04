import React, { Component } from 'react'
import GridContainer from '../offersgrid/GridContainer'
class Market extends Component {
  
  constructor(props) {
    super(props)

    console.log(props)
  }
  componentDidMount() {
    console.log("Market component mounted")
    
  }

  refresh() {
    this.props.onRefresh()
  }

  renderOffers() {

    return <GridContainer offers={this.props.offers} onClick={this.props.onPurchaseClick} />;
  }
  render() {
    return(
            <div>
              <a href="#" onClick={this.refresh.bind(this)}> Refresh </a>
              {this.props.offers == null ?
                <p> Please Refresh </p>
              :
                this.renderOffers()
              }
              
            </div>
    )
  }
}

export default Market