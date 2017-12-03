import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
      <a href="#" className="navbar-item" onClick={(event) => onLogoutUserClick(event)}>Logout</a>
  )
}

export default LogoutButton
