import React, { useState } from 'react'
import "../styles/auth.scss"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  function handleInpChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (!values.username || !values.password) return toast("Please field all the fields", {type: "error"})
    try {
    const {data} = await axios.post("/auth/login", values)
    const {token, message} = data
    toast(message, {type: "success" })
    localStorage.setItem("token", token)
    navigate("/")
    } catch (error) {
      toast(error.response.data.error, { type: "error" })
    }
  }
  return token ? <Navigate to="/"/> : (
    <section className='container'>
      <form onSubmit={handleSubmit}>
      <input type="text" name="username" id="username"  placeholder='Username' onChange={handleInpChange} value={values.username}/>
      <input type="password" name="password" id="password" placeholder='Password'  onChange={handleInpChange} value={values.password}/>
      <div className='events'>
      <button type='submit'>Login</button>
      <Link to="/auth/register" id='link'>No account?</Link>
      </div>
    </form>
    </section>
  )
}

export default Login
