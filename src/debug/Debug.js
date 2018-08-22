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
