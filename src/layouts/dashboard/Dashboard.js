import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <div className="container">
        <br/>
        <br/>
        <div className="columns">
          <div className="column is-3">
            <aside class="menu">
              <p class="menu-label">
                General
              </p>
              <ul class="menu-list">
                <li><a class="is-active">Dashboard</a></li>
                <li><a>Open Market</a></li>
              </ul>
              <br/>
              <p class="menu-label">
                Announcements
              </p>
              <ul class="menu-list">
                <li><a>We launched 🎊!</a></li>
              </ul>
            </aside>
          </div>
       
        <div className="column is-9">
          <h1 className="title">Dashboard</h1>
          <p className="subtitle"><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
        </div>

      </div>
      </div>
    )
  }
}

export default Dashboard
