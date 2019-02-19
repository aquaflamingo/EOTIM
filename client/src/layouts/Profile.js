import React, { Component } from 'react'


/** 
 * The main profile comp, this will likely mimic how ETHLance accomplishes 
 * the profile system, but for now is left as is.
*/
class Profile extends Component {
  render() {
    return(
      <section className="section">
        <div className="container">
          <h1 className="title">Profile</h1>
          <p> You would edit your profile details here. </p>
          
        </div>
      </section>
    )
  }
}

export default Profile
