import React, { Component } from 'react'
import TransactionFormContainer from '../../ui/transactionform/TransactionFormContainer'


class NewTransaction extends Component {


  render() {
   
    return(
      <section className="section">

        <div className="container">
        <h2 className="title">New Transaction </h2>
        <p> Fill out the form below to create a new insurable transaction </p><br/>
        <TransactionFormContainer />
        </div>
    </section>
    )
  }
}

export default NewTransaction;
