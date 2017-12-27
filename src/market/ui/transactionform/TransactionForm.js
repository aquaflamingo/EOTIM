import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';

class TransactionForm extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   issuer: this.props.issuer
    // }
  }



  render() {
    const { handleChange, handleSubmit, value } = this.props;
    return(
            <form onSubmit={handleSubmit}>
                <div className="field">
                <label className="label">Transaction Name</label>
                    <div className="control">
                        <Field
                            component="input"
                            className="input"
                            placeholder="Mexico<>Vancouver Orange Freight (3T)."
                            name="transactionName"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                <label className="label">Description</label>
                    <div className="control">
                        <Field
                            component="input"
                            placeholder="D2H Freight shipping 3 tonne shipment from Mexico to Vancouver."
                            name="transactionDescription"
                            className="input"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                <label className="label">Value (ETH)</label>
                    <div className="control">
                        <Field
                            component="input"
                            className="input"
                            name="transactionValue"
                            placeholder="1.01"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                <label className="label">Counter Party Address</label>
                    <div className="control">
                        <Field
                            component="input"
                            className="input"
                            name="counterParty"
                            placeholder="0x3433eca3d3adec88639a32d123das312"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>
                <div className="field">
                <label className="label">Insurer Premium (%)</label>
                    <div className="control">
                        <Field
                            component="input"
                            placeholder="3"
                            className="input"
                            name="premium"
                            onChange={handleChange}
                            type="number"
                            value={value}
                        />
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