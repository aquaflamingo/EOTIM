import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    return(
        <div className="container">
            <div className="field">
              <label className="label">User Name</label>
              <div className="control">
                <input className="input" id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-submit" onClick={this.handleSubmit.bind(this)}>Update</button>
              </div>
            </div>
        </div>
    )
  }
}

export default ProfileForm
