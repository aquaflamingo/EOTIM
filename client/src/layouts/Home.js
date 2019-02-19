import React, { Component } from 'react'

/** 
 * Landing page for the app, allows users to navigate to the dashboard.
*/
class Home extends Component {
  render() {
    return(
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
    )
  }
}

export default Home
