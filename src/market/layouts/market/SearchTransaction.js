import React, { Component } from 'react'
import SearchTransactionFormContainer from '../../ui/searchtransactionform/SearchTransactionFormContainer'


class SearchTransaction extends Component {


  render() {
   
    return(
      <section className="section">

        <div className="container">
        <h2 className="title">Search </h2>
        <p> Find a transaction</p><br/>
        <SearchTransactionFormContainer />
        </div>
    </section>
    )
  }
}

export default SearchTransaction;
