import React, { Component } from 'react'
import getWeb3 from '../../util/web3/getWeb3'
import store from '../../store'
import TransactionContract from '../../../build/contracts/Transaction.json'
const contract = require('truffle-contract')

class Debug extends Component {

  constructor(props) {
    
    super(props);
    console.log("props are ", props)
    this.state = {
      // contract: this.props.contract
    }
  
  }

  fund() {
    
      let web3 = store.getState().web3.web3Instance;
      
  }
  
  refresh() {
    this.props.onRefresh();
  }

  render() {
    
    return(
      <div className="container">
      <br/><br/>
        <h1 className="title">Debug Land</h1>
        <section className="section">
            <h2> Transaction </h2>
            <p> Balance:  {this.state.contract}</p>
            <p> Coverage:  {this.state.cover}</p>
            <p> Premium:  {this.state.premium}</p>
            <p> Owner:  {this.state.owner}</p>
            <p> Insurer:  {this.state.insurer}</p>
            <button className="button is-info" onClick={this.fund.bind(this)}>Fund 1 ETH</button>
            <button className="button is-success" onClick={this.refresh.bind(this)}>Refresh</button>
        </section>
      </div>
    )
  }
}

export default Debug
