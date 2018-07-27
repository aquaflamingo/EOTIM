import React, { Component } from 'react'
import MarketMenu from '../../../ui/MarketMenu'
import {Link} from 'react-router'
import DashContainer from "../../ui/dash/DashContainer"

class Dashboard extends Component {


  render() {
  
    var links = [
      {to:'#',name:'Launched 🎊'}
    ]

    return(
      <div className="container">
      <br/><br/>
      <div className="columns">
        <div className="column is-3">
           <MarketMenu
           title="Announcements"
           links={links} />
        </div>
        <div className="column is-9">
          <h1 className="title">Dashboard</h1>
            <DashContainer />
          

        </div>
      </div>
      </div>
    )
  }
}

export default Dashboard
