import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';
import {isAddress} from '../../../util/isAddress';
import { Link } from 'react-router'

/**
 * Validates the form values, and passes an error object back containing specific errors
 * @param {object} values 
 */
const validate = values => {
    const errors = {}
    /* Transaction Name */
    if (!values.transactionName) {
      errors.transactionName = '* Required'
    } else if (values.transactionName.length > 32) {
      errors.transactionName = '* Must be 32 characters or less'
    }
    /* Transaction Description */
    if (!values.transactionDescription) {
      errors.transactionDescription = '* Required'
    } else if (values.transactionDescription.length>32 || values.transactionDescription.length<0) {
      errors.transactionDescription = '* Must be greater than 0 and less than 32 characters'
    }
    /* Transaction Ethereum Value */
    if (!values.transactionValue) {
        errors.transactionValue = '* Required'
    } else if (values.transactionValue<0) {
        errors.transactionValue = '* Cannot be less than 0'
    } else if (isNaN(values.transactionValue)) {
        errors.transactionValue = '* Must be a number.'
    }

    //  /* Transaction Counter Party */
     if (!values.counterPartyAddress) {
        errors.counterPartyAddress = '* Required'
     } else if(!isAddress(values.counterPartyAddress)) {
        errors.counterPartyAddress = '* Invalid Ethereum Address'
     }

     if (!values.insurerPremium) {
        errors.insurerPremium = '* Required'
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


const devMode = true;

/** 
 * Specific Form component for building a new insurance offering 
 * Uses Redux Form
*/

class TransactionForm extends Component {


    /**
     *  Displays notification of contract address and creation (Still buggy) 
     * FIXME://
     * */
  renderNotification(newContractEvent) {
   console.log("New Contract created!  ", newContractEvent.tx);
   
    return (
        <div className="notification is-success">
            Contract created! 
            Receipt: {newContractEvent.tx}
            <p>
            <Link to="/marketplace">
                Check it out here.
            </Link></p>
        </div>
    )
  }
  
  render() {
      console.log("Developer Mode?", devMode);

    const { handleChange, handleSubmit, value } = this.props;
    /**
     * devMode fills the form with seed values automatically 
     */
    return(
            <form onSubmit={handleSubmit}>
            {   
                
                this.props.status!=null ? 
                this.renderNotification(this.props.status)
                :
                null
            }
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
                            placeholder="0x6ac70c5bc0bad41d66621c25ea7b23f76b02e6e9"
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
                            <option></option>
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
                            <option></option>
                            <option value="1">1%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="25">25%</option>
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