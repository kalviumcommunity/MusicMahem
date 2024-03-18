import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import AddUser from './Component/AddUser'
import Update from './Component/Update'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Logout from './Component/Logout'
import Profile from './Component/Profile'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='logout' element={<Logout/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
