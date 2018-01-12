import React, { Component } from 'react'
import AsideMenu from '../../../ui/AsideMenu'
import {Link} from 'react-router'
class Dashboard extends Component {


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
          <p className="subtitle"><strong>Congratulations! </strong> Welcome to EOTIM!</p>

            <br/><br/><br/>
            <div className="notification">
              <p> Nothing to see here. </p>
              <p> Head over to the market to <Link to="marketplace">browse.</Link></p>
            </div>

        </div>
      </div>
      </div>
    )
  }
}

export default Dashboard
