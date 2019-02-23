import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Styles

import 'css/bulma.css'
import './App.css'

/**
 * App container eventually to include
 */
class App extends Component {
  render() {
    const Links = () =>  {
      return(   
        <div className="navbar-end">
            <a className="navbar-item">
              <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            </a>
            <a className="navbar-item">
              <Link to="/profile" className="navbar-item">Profile</Link>
            </a>
            <a className="navbar-item">
              <Link to="/marketplace" className="navbar-item">Market</Link>
            </a>
          </div>
      )
    }


    return (
      <div className="App">
        <div className="container">
            <nav className="navbar is-white">
            
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item">
                  <Link className="navbar-item" to="/" ><img src="logo.png" alt="logo"/></Link>
                </a>
              </div>
              <Links/>
              </div>
            
          </nav>
        </div>

        <div className="main-content section">
          <section className="hero is-medium is-primary">
            <div className="hero-body">
              <p className="title">
                Ethereum Open Transaction Insurance Market (EOTIM)
              </p>
              <p className="subtitle">
                Insure Ethereum transactions. Get paid.
              </p>
              <p>
                EOTIM provides individuals who hold ETH to make their ETH work for them, by insuring escrow transactions and receiving premium payouts.
              </p>

              <a href="/dashboard" className="button is-warning">Start</a>
              
            </div>
          </section>
        </div>

        <section className="section">
          <footer>  
              <div className="content has-text-centered">
                <p>
                  <strong>Ethereum Open Transaction Insurance Market</strong>
                </p>
                <p>Created 2018 ️️✌️</p>
                <br/>
                <br/>
              </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default App
