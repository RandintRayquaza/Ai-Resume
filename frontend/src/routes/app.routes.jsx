import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from '../Features/auth/pages/Login'
import Signin from '../Features/auth/pages/Signin'
import Home from '../Home'
const AppRouter = () => {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signin />} />
    </Routes>
   </>
  )
}

export default AppRouter