import React, { Component } from 'react'
import { Link } from 'react-router'

class Dash extends Component {
  
    constructor(props) {
      super(props)
    }
  
  
  
    componentDidMount() {
      console.log("Dash component mounted")
      setTimeout(this.props.onRefresh,1000)
    }
  
  
    refresh() {
      this.props.onRefresh()
    }

    render() {
        return (
            <div className="notification">
              <p> Nothing to see here. </p>
              <p> Head over to the market to <Link to="marketplace">browse.</Link></p>
            </div>
        )
    }
}

export default Dash;
