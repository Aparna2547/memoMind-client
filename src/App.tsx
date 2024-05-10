import Login from "./page/Login"
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Signup from "./page/Signup"
import { Toaster } from 'sonner'
import Home from "./page/Home"
import { useSelector } from 'react-redux';
import Bin from "./page/Bin"


interface RootState{
  auth:{
      token: string
  }
  }


function App() {
 const {token} = useSelector((state:RootState)=>state.auth)

  return (
    <>
       <Toaster position="top-center" richColors/>
    <Router>
      <Routes>
      <Route path='/signup' element={!token ? <Signup /> : <Navigate to={'/'}/> } />
      <Route path='/signin' element={!token ? <Login/> : <Navigate to={'/'}/>} />
      <Route path='/' element={token ? <Home/> : <Navigate to={'/signin'}/>} />  
      <Route path='/bin' element={token ? <Bin/> : <Navigate to={'/signin'}/>} />  
      </Routes>
    </Router>
     
    </>
  )
}

export default App
