// Author: Adel Md. Adnan
// Date: 18-01-24


import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {


  return (
    <div className="App">
        <Router>
          <Routes>
            {/* Protected Route */}
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard/>} path="/"/>
            </Route>
        
            <Route element={<Login/>} path="/login"/>
            <Route element={<SignUp/>} path="/register"/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
