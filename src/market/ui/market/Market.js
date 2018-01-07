import React, { Component } from 'react'
import GridContainer from '../offersgrid/GridContainer'
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