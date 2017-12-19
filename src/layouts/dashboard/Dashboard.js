import React, { Component } from 'react'
import AsideMenu from '../../ui/AsideMenu'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <div className="container">
      <br/><br/>
      <div className="columns">
        <div className="column is-3">
          <AsideMenu />
        </div>
        <div className="column is-9">
          <h1 className="title">Dashboard</h1>
          <p className="subtitle"><strong>Congratulations {this.authData.name} </strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Dashboard
