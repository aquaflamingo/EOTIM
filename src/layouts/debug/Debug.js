import React, { Component } from 'react'
import getWeb3 from '../../util/web3/getWeb3'
import store from '../../store'
import STransactionContract from '../../../build/contracts/STransaction.json'
const contract = require('truffle-contract')

class Debug extends Component {

  refresh() {
    let web3 = store.getState().web3.web3Instance;



        const stransaction = contract(STransactionContract)
        stransaction.setProvider(web3.currentProvider)

        // Declaring this for later so we can chain functions on stransaction.
        var stransactionInstance
        
        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
              console.error(error);
            }
        

      // Get current ethereum wallet.
        stransaction.deployed().then(function(instance) {
          stransactionInstance = instance
            console.log(stransactionInstance)
          // Attempt to login user.
          stransactionInstance.getBalance()
          .then(function(result) {
            // If no error, update user.

            return alert('Name updated!')
          })
          .catch(function(result) {
            // If error...
          })
      })
    })

  }

  render() {
    return(
      <div className="container">
      <br/><br/>
        <h1 className="title">Debug Land</h1>
        <section className="section">
            <h2> STransaction </h2>
            <p> Balance:  <span id="bal"></span></p>
            <p> Coverage:  <span id="cover"></span></p>
            <p> Premium:  <span id="pre"></span></p>
            <p> Owner:  <span id="owne"></span></p>
            <p> Insurer:  <span id="insur"></span></p>
            <button className="button is-info" onClick={this.refresh.bind(this)}>Refresh</button>
        </section>
      </div>
    )
  }
}

export default Debug
