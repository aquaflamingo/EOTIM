import React, { Component } from 'react'

class Market extends Component {
  
  componentDidMount() {
    console.log("Hello world component mounted")
    
  }

  refresh() {
    this.props.onRefresh()
  }
  render() {
    return(
            <div>
              <a href="#" onClick={this.refresh.bind(this)}> Refresh </a>
            </div>
    )
  }
}

export default Market