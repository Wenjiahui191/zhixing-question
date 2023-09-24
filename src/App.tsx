import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import routers from './pages/router'
import './App.css'

function App() {
  return <RouterProvider router={routers}></RouterProvider>
}

export default App
