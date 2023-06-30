import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import Main from "./pages/Main"
import Layout from "./Components/Layout"
import Login from "./pages/Login"

function App() {

  return (
    <Routes>
      <Route path="/auth/register" element={<Register/>}/>
      <Route path="/auth/login" element={<Login/>}/>
      <Route element={<Layout/>}>
      <Route path="/" element={<Main/>}/>
      </Route>
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  )
}

export default App
