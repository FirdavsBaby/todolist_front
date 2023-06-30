import React, { useEffect, useState } from 'react'
import "../styles/auth.scss"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
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
    const {data} = await axios.post("/auth/register", values)
    const {token, message} = data
    localStorage.setItem("token", token)
    toast(message, {type: "success" })
    navigate("/")
    } catch (error) {
        toast(error.response.data.error, { type: "error" })
    }
  }

  return token ? <Navigate to="/"/> : (
    <section className='container'>
      <form onSubmit={handleSubmit}>
      <input type="text" name="username" id="username"  placeholder='Username' onChange={handleInpChange}  value={values.username}/>
      <input type="password" name="password" id="password" placeholder='Password'  onChange={handleInpChange}  value={values.password}/>
      <div className='events'>
      <button type='submit'>REGISTER</button>
      <Link to="/auth/login" id='link'>Already have account?</Link>
      </div>
    </form>
    </section>
  ) 
}

export default Register
