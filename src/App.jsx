import { useState, useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AuthRequired from './components/AuthRequired/AuthRequired'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Authenticated/Profile/Profile'

export default function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<AuthRequired />}>
        <Route path='main' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
        </Route>

      </Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
