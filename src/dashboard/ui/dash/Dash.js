import React, { Component } from 'react'
import { Link } from 'react-router'
import SettleableTransactionContainer from '../settleable-transaction/SettleableTransactionContainer'
import BasicNotification from '../../../ui/BasicNotification';

class Dash extends Component {
  
    componentDidMount() {
      console.log("Dash component mounted")
      setTimeout(this.props.onRefresh,1000)
    }

    renderOwnedContracts() {
      let unsettledContracts = []
      let settledContracts = []
      for (let offer of this.props.offers) {
        if (offer.state==='settled') {
          settledContracts.push(
              <div className="box">  
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{offer.offerName}</strong><small><span className="tag">Date</span></small>
                      <br/>
                      {offer.address}
                      <small>Counter Party:{offer.counterParty}</small> 
                    </p>
                  </div> 
              </div> 
          </div>)
        } else {
          unsettledContracts.push(
              <SettleableTransactionContainer
                  offer={offer} />
          )
        }
      }
      if (unsettledContracts.length===0 && settledContracts.length===0) {
        return (<div className="owned-transaction">
                <BasicNotification 
                  title="No contracts found." 
                  color='is-info'
                  description="You don't currently own any contracts at this time."/>
                </div>)
      } else if (unsettledContracts.length===0 && settledContracts.length>0) {
        return (
          <div className="owned-transactions">
            <BasicNotification 
                    title="No contracts found." 
                    color='is-info'
                    description="You don't have any unsettled contracts."/>
             <h3 className="subtitle">Settled Contracts</h3>
              {settledContracts}
          </div>
        )
      } else if (unsettledContracts.length>0 && settledContracts.length===0) {
        return (
          <div className="owned-transactions">
            <h3 className="subtitle">Unsettled Transactions</h3>
            {unsettledContracts}
            <h3 className="subtitle">Settled Contracts</h3>
              <BasicNotification 
                  title="No contracts found." 
                  color='is-info'
                  description="None of your contracts are settled at this time."/>
          </div>
        )
      } else {
        return (
          <div className="owned--transactions">
            <h3 className="subtitle">Unsettled Transactions</h3>
            {unsettledContracts}
            <h3 className="subtitle">Settled Contracts</h3>
            {settledContracts}
          </div>
        )
      }
      
    }
    refresh() {
      this.props.onRefresh()
    }


    renderContractsFeed() {
      if (this.props.offers.length === 0)
        return(
          <div>
              <BasicNotification 
              title="⚠️ No contracts found." 
              color='is-info'
              description="You don't currently own any contracts at this time."/>
          </div>
         
        )
      else
        return (
            this.renderOwnedContracts()
        )
            
            
    }

    render() {
        return (
          <div className="content">
        
            { this.props.settlement === null ?
              null 
            :
              this.props.settlement.status === true ?
                <BasicNotification title="👌 Settled Transaction!" description={`Transaction was settled.. ${this.props.settlement}`} color="is-success"/>
              :
                <BasicNotification title="⚠️ Failed to Settle Transaction!" description={`Transaction failed to settle... ${this.props.settlement.error}`} color="is-danger"/>
            }
            {this.props.offers === null ?
              <p> Refreshing.. </p>
              :
              this.renderContractsFeed()
            }

            <h3> Debug Land </h3>
              <button href="#" className="button is-info is-medium" onClick={(ev)=>this.props.onFakeClick()}>
              Fake Transaction 
              </button>
          </div>
        )
    }
}

export default Dash;
