import React, { Component } from 'react'
import store from '../store'
import InsurableTransactionFactory from '../../build/contracts/InsurableTransactionFactory.json'
const contract = require('truffle-contract')

class Debug extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }



    refreshOffer(val) {
        let web3 = store.getState().web3.web3Instance
        console.log("Refresh offer")
        // Double-check web3's status.
        if (typeof web3 !== 'undefined') {

            return function (dispatch) {
                const factory = contract(InsurableTransactionFactory)
                factory.setProvider(web3.currentProvider)

                factory.deployed().then(function (instance) {
                    instance.get([1])
                        .then(function (result) {

                            console.log("Offers are refreshed!! , ", result)

                        })
                        .catch(function (err) {
                            // If error, go to signup page.
                            console.error('Error in getting factory ', err)

                        })
                })
            }
        } else {
            console.error('Web3 is not initialized.');
        }
    }

    componentDidMount() {
        this.refreshOffer(0)
    }

    handleSubmit(event) {
        alert("clicked ",this.state.value)
        this.refreshOffer(this.state.value)
    }

    render() {
        return(
            <div className="container">
                <br/><br/>
                <section>
                    <h1 className="title">Debug</h1>
                    <br/>

                        <input className="input" value={this.state.value} onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit.bind(this)}>Sub</button>
                    <span>{this.state.payload}</span>
                </section>
            </div>
        )
    }
}

export default Debug
