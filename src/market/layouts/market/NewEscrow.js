import React, { Component } from 'react'


class NewEscrow extends Component {


  render() {
   
    return(
      <section className="section">
     
      <div className="container">
      <h2 className="title">New Escrow Transaction </h2>
      <p> Fill out the form below to create a new insurable escrow transaction </p>
      <br/>
        <div className="field">
          <label className="label">Transaction Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Real estate deed transfer"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="input" type="text" placeholder="Making deed transfer from Toronto to Texas"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Escrow Value (ETH)</label>
          <div className="control">
            <input className="input" type="text" placeholder="1.01" />
          </div>
        </div>

        <div className="field">
        <label className="label">Loss Coverage (%)</label>
        <div className="control">
          <div className="select">
            <select>
              <option>10%</option>
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
      <label className="label">Payable Premium (%)</label>
      <div className="control">
        <div className="select">
          <select>
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
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
    </div>
    </section>
    )
  }
}

export default NewEscrow;
