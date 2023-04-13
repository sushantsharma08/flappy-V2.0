import { useState } from 'react'
import './App.css'
import Game from './Pages/Game'
import Authentication from './Pages/Authentication'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/auth"  element={<Authentication/>}/>
          <Route path="/" element={<Game />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
