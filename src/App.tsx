import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                {/* <Route element={<Dashboard/>} path="/" exact/> */}
            </Route>
            <Route element={<Dashboard/>} path="/" exact/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<SignUp/>} path="/register"/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
