import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles

import './css/bulma.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
  
      <div className="navbar-end">
          <a className="navbar-item">
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
          </a>
          <a className="navbar-item">
            <Link to="/profile" cclassName="navbar-item">Profile</Link>
          </a>
          <a className="navbar-item">
            <Link to="/marketplace" className="navbar-item">Market</Link>
          </a>
            <LogoutButtonContainer />
        </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>

      <div className="navbar-end">
            <Link to="/signup" className="navbar-item">Sign Up</Link>
            <LoginButtonContainer />
        </div>
    )

    return (
      <div className="App">
          <nav className="navbar is-white">
          <div className="container">
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                <Link className="navbar-item" to="/" >Escro Market</Link>
              </a>
            </div>
            <OnlyAuthLinks/>
            <OnlyGuestLinks/>
            </div>
          </div>
        </nav>

        <div className="main-content">
        {this.props.children}
        </div>

        <footer>
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>EscroMarket</strong> made by <a href="https://robertsimoes.com">Robert Simoes</a>. ✌️
              </p>
              <p>
                ETH: 0x34b081884Ac640B6CAD3bC9aA1d1cdd5e33AAAb1
              </p>
              <br/>
              <br/>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App
