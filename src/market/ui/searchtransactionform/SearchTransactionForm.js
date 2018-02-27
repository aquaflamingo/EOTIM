import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form';
import {isAddress} from '../../../util/isAddress';


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
    const { handleChange, handleSubmit, value } = this.props;
    return(
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
                        <button className="button is-success" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <a className="button is-text" href="/marketplace">Back</a>
                    </div>
                </div>


            </form>
    )
  }
}

export default reduxForm({form: 'SearchTransactionForm'})(SearchTransactionForm)