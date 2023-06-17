import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// components
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import About from './components/About'


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
            {/* private routes */} 
          <Route  element={<ProtectedRoutes/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/about' element={<About/>}></Route>
          </Route>


          <Route path='/' element={<Home/>}></Route>      
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
