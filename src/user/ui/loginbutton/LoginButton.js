import React from 'react'

const LoginButton = ({ onLoginUserClick }) => {
  return(
      <a href="#" className="navbar-item"  onClick={(event) => onLoginUserClick(event)}>Login</a>
  )
}

export default LoginButton
