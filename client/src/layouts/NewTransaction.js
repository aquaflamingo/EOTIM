import React, { Component } from 'react'
import TransactionFormContainer from 'market/ui/transactionform/TransactionFormContainer'


class NewTransaction extends Component {


  render() {
   
    return(
      <section className="section">

        <div className="container">
        <h2 className="title">Create a New Insurance Offer </h2>
        <p> Fill out the form below to create a new insurance offering. </p><br/>
        <TransactionFormContainer />
        </div>
    </section>
    )
  }
}

export default NewTransaction;
