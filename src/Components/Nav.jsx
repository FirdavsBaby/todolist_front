import React from 'react'
import "../styles/nav.scss"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Nav = () => {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem("token")
     navigate("/auth/login")
     toast("You are logged out", {type: 'info'})
  }
  return (
    <nav className='container'>
      <Link to="/" id='logo'>TODOLIST</Link>
      <button onClick={handleLogout}>LOGOUT</button>
    </nav>
  )
}

export default Nav
