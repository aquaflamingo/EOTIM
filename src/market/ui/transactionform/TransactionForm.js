import React, { Component } from 'react'
import {reduxForm} from 'redux-form';

class TransactionForm extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   issuer: this.props.issuer
    // }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onTransactionFormSubmit(this.state.name)
  }

  render() {
    const {fields: {
        transactionName, 
        transactionDesc,
        counterPartyAddress,
        insurerPremium,
        transactionValue}, handleSubmit} = this.props;
    return(
            <form onSubmit={handleSubmit}>
                <div className="field">
                <label className="label">Transaction Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Mexico to Vancouver Oranges Freight" {...transactionName}/>
                </div>
                </div>

                <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <input className="input" type="text" placeholder="3 T shipment from mexico to vancouver." {...transactionDesc}/>
                </div>
                </div>

                <div className="field">
                    <label className="label">Value (ETH)</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="1.01" {...transactionValue} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Counter Party Address</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="0x3433eca3d3adec88639a32d123das312" {...counterPartyAddress} />
                    </div>
                </div>

            <div className="field">
            <label className="label">Payable Premium (%)</label>
            <div className="control">
                <div className="select">
                <select {...insurerPremium}>
                    <option>1%</option>
                    <option>2%</option>
                    <option>5%</option>
                    <option>10%</option>
                </select>
                </div>
            </div>
            </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-text" href="/marketplace">Cancel</button>
                    </div>
                </div>
            </form>
    )
  }
}

export default reduxForm({form: 'TransactionForm'})(TransactionForm)