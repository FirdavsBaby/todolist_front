import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import "../styles/main.scss"
import { toast } from 'react-toastify'
import Loading from '../Components/Loading'
const Main = () => {
  const [data, setData] = useState(null)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    title: '',
    description: '',
    important: false
  })

  const [updValues, setUpdValues] = useState({
    title: '',
    description: ''
  })

  let token = localStorage.getItem("token")
  
  useEffect(()=>  {
    (async function() {
      setLoading(true)
      const {data} = await axios.get("/todos")
      setData(data)
      setAdded(false)
      setLoading(false)
    })()
  },[added])

  function handleInpChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  function handleCheckBox(e) {
    setValues((v) => ({ ...v, [e.target.name]: v.important ? false : true}));
  }
  function handleInptUpdate(e) {
    setUpdValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    console.log(updValues);
  }

  async function handleDelete(e) {
    const parent = e.target.parentElement.parentElement
    const id = parent.getAttribute("data-id")
    try {
      const {data} = await axios.delete(`/todos/delete/${id}`)
      toast(data.message, {type: "info"})
      setAdded(true)
    } catch (error) {
      toast(error.response.data.error, { type: "error" })
    }
  }

  async function handleAddTodo(e) {
    e.preventDefault()
    if (!values.title || !values.description) return toast("Please field all the fields", {type: "error"})
    try {
      const {data} = await axios.post("/todos/new", values)
      if (data.message) toast(data.message, {type: "success"})
      setValues({
        title: '',
        description: '',
        important: false
      }) 
      setAdded(true)
    } catch (error) {
      toast(error.response.data.error, { type: "error" })
    }
  }
  async function handleUpdate(e) {
    const parent = e.target.parentElement.parentElement
    const id = parent.getAttribute("data-id")
    if (!updValues.title || !updValues.description ) return toast("Nothing to update", {type: "error"})
    try {
      const {data} = await axios.put(`todos/update/${id}`, updValues)
      toast(data.message, {type: "success"})
      setUpdValues({
        title: '',
        description: ''
      })
      setAdded(true)
    } catch (error) {
      toast(error.response.data.error, { type: "error" })
    }
  }
  return token ? (
    <section className='container'>
      <form onSubmit={handleAddTodo}>
        <h2>ADD TODO</h2>
        <input type="text" name="title" id="title" onChange={handleInpChange} value={values.title} placeholder='Title'/>
        <input type="text" name="description" id="description" onChange={handleInpChange} value={values.description} placeholder='Description'/>
        <div>
          <label htmlFor="important">Click to make {values.important ? "not important" : "important"}</label>
        <input type="checkbox" name="important" id="important" onChange={handleCheckBox}/>
        </div>
        <button>ADD</button>
      </form>
      {loading ? <Loading/> : 
      <div id='todos'>
        {data?.length ? data?.map(t=> {
          return (
          <div className={t.important ? 'todo important' : "todo"} key={t.id} data-id={t.id}>
          <input type="text" name='title' defaultValue={t.title} onChange={handleInptUpdate}/>
          <textarea name="description" defaultValue={t.description} cols="30" rows="5" onChange={handleInptUpdate}></textarea>
          <div><button onClick={handleUpdate} className='pen'><i className="fa-solid fa-pen-to-square"></i></button><button className='trash' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button></div>
          <h6>{t.updated_at.split("T")[0] + "/" + t.updated_at.split("T")[1].split(".")[0]}</h6>
        </div>
          )
        }) : <h2 className='no'>NO TODOS</h2>}
      </div>}
    </section>
  ) : <Navigate to="/auth/login"/>
}

export default Main
