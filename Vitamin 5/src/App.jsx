import Navbar from './Components/Navbar/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import NotHome from './Pages/NotHome/NotHome.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nothome" element={<NotHome />} />
      </Routes>
    </>
  )
}

export default App
