import React, { Component } from 'react'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
class Home extends Component {
  render() {
    return(
        <section className="hero is-medium is-primary">
          <div className="hero-body">
            <p className="title">
              EscroMarket
            </p>
            <p className="subtitle">
              Insure Ethereum escrow transactions. Get paid.
            </p>

            <a href="/signup" className="button is-warning">Create account</a>
            
          </div>
        </section>

      
    )
  }
}

export default Home
