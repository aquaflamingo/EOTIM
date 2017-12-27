import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';
import {isAddress} from '../../../util/isAddress';

const validate = values => {
    const errors = {}
    /* Transaction Name */
    if (!values.transactionName) {
      errors.transactionName = '* Required'
    } else if (values.transactionName.length > 50) {
      errors.transactionName = '* Must be 50 characters or less'
    }
    /* Transaction Description */
    if (!values.transactionDescription) {
      errors.transactionDescription = '* Required'
    } else if (values.transactionDescription.length>500 || values.transactionDescription.length<20) {
      errors.transactionDescription = '* Must be greater than 20 and less than 500 characters'
    }
    /* Transaction Ethereum Value */
    if (!values.transactionValue) {
        errors.transactionValue = '* Required'
    } else if (values.transactionValue<0) {
        errors.transactionValue = '* Cannot be less than 0'
    }

     /* Transaction Counter Party */
     if (!values.counterPartyAddress) {
        errors.counterPartyAddress = '* Required'
     } else if(!isAddress(values.counterPartyAddress)) {
        errors.counterPartyAddress = '* Invalid Ethereum Address'
     }

    /* Transaction premium and max coverage are automatically selected */
    return errors
  }

const renderField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error }
  }) =>
    <div>
      <label className="label">
        {label}
      </label>
      <div>
        <input className="input" {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error &&
            <span className="help is-danger">
              {error}
            </span>) )}
      </div>
    </div>

class TransactionForm extends Component {
  constructor(props) {
    super(props)


  }
  
  render() {

    const { handleChange, handleSubmit, value } = this.props;
    return(
            <form onSubmit={handleSubmit}>
                <div className="field">
                
                    <div className="control">
                        <Field
                            component={renderField}
                            label="Transaction Name"
                            placeholder="Mexico<>Vancouver Orange Freight (3T)."
                            name="transactionName"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                
                    <div className="control">
                        <Field
                            component={renderField}
                            placeholder="D2H Freight shipping 3 tonne shipment from Mexico to Vancouver."
                            name="transactionDescription"
                            label="Description"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <Field
                            component={renderField}
                            name="transactionValue"
                            label="Value (ETH)"
                            placeholder="1.01"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <Field
                            component={renderField}
                            className="input"
                            label="Counter Party Address"
                            name="counterPartyAddress"
                            placeholder="0x3433eca3d3adec88639a32d123das312"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>

                <div className="field">
                <label className="label">Max Insurance (%)</label>
                    <div className="select">
                        <Field
                            component="select"
                            name="maxInsurance">
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">100%</option>
                        </Field>
                    </div>
                </div>
                
                <div className="field">
                    <label className="label">Insurer Premium (%)</label>
                    <div className="select">
                        <Field
                            component="select"
                            name="insurerPremium">
                            <option value="25">1%</option>
                            <option value="50">5%</option>
                            <option value="75">10%</option>
                            <option value="100">25%</option>
                        </Field>
                    </div>
                </div>
                
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <a className="button is-text" href="/marketplace">Cancel</a>
                    </div>
                </div>


            </form>
    )
  }
}

export default reduxForm({form: 'TransactionForm',validate})(TransactionForm)