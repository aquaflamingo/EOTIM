import React, { Component } from 'react'
import DebugContainer from './DebugContainer';

class D extends Component {


  render() {
    return(
      <div className="container">
      <br/><br/>
        <h1 className="title">D.js Land</h1>
        <section className="section">
            <DebugContainer/>
        </section>
      </div>
    )
  }
}

export default D
