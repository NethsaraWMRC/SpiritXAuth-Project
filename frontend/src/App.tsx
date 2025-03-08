import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/sign-up'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
