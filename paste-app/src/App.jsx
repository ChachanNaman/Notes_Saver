
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element:
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path: "/pastes",
        element:
        <div>
          <Navbar/>
          <Paste/>
        </div>
      },
      {
        path: "/pastes/:id",
        element:
        <div>
          <Navbar/>
          <ViewPaste/>
        </div>
      },
      {
        path: "/login",
        element:
        <div>
          <Navbar/>
          <Login/>
        </div>
      },
      {
        path: "/register",
        element:
        <div>
          <Navbar/>
          <Register/>
        </div>
      },
    ]
  )
  return (
    <div className="min-h-screen bg-background">
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App