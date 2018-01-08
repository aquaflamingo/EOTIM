import React, { Component } from 'react'
import { Link } from 'react-router'

// Styles

import './css/bulma.css'
import './App.css'

class App extends Component {
  render() {
    const Links = () =>  {
      return(   
        <div className="navbar-end">
            <a className="navbar-item">
              <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            </a>
            {/* <a className="navbar-item">
              <Link to="/profile" className="navbar-item">Profile</Link>
            </a> */}
            <a className="navbar-item">
              <Link to="/marketplace" className="navbar-item">Market</Link>
            </a>
          </div>
      )
    }


    return (
      <div className="App">
          <nav className="navbar is-white">
          <div className="container">
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                <Link className="navbar-item" to="/" ><img src="logo.png"/></Link>
              </a>
            </div>
            <Links/>
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
                <strong>Ethereum Open Transaction Insurance Market</strong> made by <a href="https://robertsimoes.com">Robert Simoes</a>. ✌️
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
