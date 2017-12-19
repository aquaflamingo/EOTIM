import React, { Component } from 'react'
import getWeb3 from '../../util/web3/getWeb3'
import store from '../../store'
import TransactionContract from '../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

class Debug extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bal:0,
      cover:0,
      premium:0,
      owner:null,
      insurer:null
    }
  }
  fund() {
    
      let web3 = store.getState().web3.web3Instance;
      const stransaction = contract(TransactionContract)
      stransaction.setProvider(web3.currentProvider)
      // Declaring this for later so we can chain functions on stransaction.
      var stransactionInstance
          
      console.log("Getting coinbase")
      web3.eth.getCoinbase((error, coinbase) => {
          // Log errors, if any.
          if (error) {
            console.error(error);
          }

          console.log(coinbase)
      

    // Get current ethereum wallet.
      stransaction.deployed().then(function(instance) {
        stransactionInstance = instance
        
        console.log(stransactionInstance)
        // Attempt to login user.
        stransactionInstance.fund({value:web3.toWei(1,'ether'), from:coinbase}).then(function(result) {
          // If no error, update user.
            console.log("Result is!")
            this.setState({
              bal:web3.fromWei(result,"ether")
            })
            console.log(result)
          }).catch(function(result) {
          console.log("Failed to get deployed contract")
          console.log(result)
          // If error...
        })
    })
  })
  }
  refresh() {
  
    console.log("Getting web 3")
      let web3 = store.getState().web3.web3Instance;

        const stransaction = contract(TransactionContract)
        stransaction.setProvider(web3.currentProvider)

        // Declaring this for later so we can chain functions on stransaction.
        var stransactionInstance
        
        console.log("Getting coinbase")
        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
              console.error(error);
            }

            console.log(coinbase)
        

      // Get current ethereum wallet.
        stransaction.deployed().then(function(instance) {
          stransactionInstance = instance
          
          console.log(stransactionInstance)
          // Attempt to login user.
          stransactionInstance.getBalance().then(function(result) {
            // If no error, update user.
              console.log("Result is!")
              this.setState({
                bal:web3.fromWei(result,"ether")
              })
              console.log(result)
            }).catch(function(result) {
            console.log("Failed to get deployed contract")
            console.log(result)
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
            <h2> Transaction </h2>
            <p> Balance:  {this.state.bal}</p>
            <p> Coverage:  {this.state.cover}</p>
            <p> Premium:  {this.state.premium}</p>
            <p> Owner:  {this.state.owner}</p>
            <p> Insurer:  {this.state.insurer}</p>
            <button className="button is-info" onClick={this.refresh.bind(this)}>Refresh</button>
            <button className="button is-info" onClick={this.fund.bind(this)}>Fund 1 ETH</button>
        </section>
      </div>
    )
  }
}

export default Debug
