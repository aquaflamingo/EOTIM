import React, { Component } from 'react'

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

            <a href="/dashboard" className="button is-warning">Start</a>
            
          </div>
        </section>

      
    )
  }
}

export default Home
