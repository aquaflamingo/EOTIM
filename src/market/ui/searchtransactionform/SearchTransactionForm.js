import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';
import {isAddress} from '../../../util/isAddress';
import TransactionItemContainer from '../transactionitem/TransactionItemContainer'
/**
 * Validates the form values, and passes an error object back containing specific errors
 * @param {object} values 
 */
const validate = values => {
    const errors = {}
    if (!values.searchQuery) {
        errors.searchQuery = '* Required'
     } else if(!isAddress(values.searchQuery)) {
        errors.searchQuery = '* Invalid Ethereum Address'
     }
    return errors
}
/**
 * Based on Redux Form tutorial creates a redux form with appropriate layouts.
 */
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

/** 
 * Basic container for eventual search function with input and submission
*/
class SearchTransactionForm extends Component {

  
  render() {
    const { handleChange, handleSubmit, value, onClick } = this.props;
    return(
        <div className="container">

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <div className="control">
                        <Field
                            component={renderField}
                            placeholder="Enter an address"
                            name="searchQuery"
                            onChange={handleChange}
                            type="text"
                            value={value}
                        />
                    </div>
                </div>
                
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-info" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <a className="button is-text" href="/marketplace">Back</a>
                    </div>
                </div>


            </form>
            <br/>
            <br/>
            <br/>
                {
                    this.props.searchContract === null ?
                    null
                    :
                    this.props.searchContract.error!=null ? 
                    <div className="notification is-danger">
                        <p> {this.props.searchContract.error} </p>
                    </div>  
                    :  
                    <div className="notification is-white">
                        <h3 className="title is-3">Contract Found!</h3>
                        <TransactionItemContainer 
                            {... this.props.searchContract}/>
                    </div>
                }
            </div>
    )
  }
}

export default reduxForm({form: 'SearchTransactionForm',validate})(SearchTransactionForm)