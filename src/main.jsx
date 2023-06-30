import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import  axios  from 'axios';
axios.defaults.baseURL = "https://todolist-cu0y.onrender.com/api"

let token = localStorage.getItem("token") || null

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    <ToastContainer theme='colored'/>
  </Router>,
)
