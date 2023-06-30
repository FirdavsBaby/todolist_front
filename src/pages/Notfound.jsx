import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/notfound.scss"
const Notfound = () => {
  return (
    <section className='container'>
        <div className='box'>
            <h1>PAGE NOT FOUND 🤨</h1>
            <Link id='link' to="/">Back</Link>
        </div>
    </section>
  )
}

export default Notfound
