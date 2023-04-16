import './App.css'
import Game from './Pages/Game'
import Authentication from './Pages/Authentication'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Scoreboard from './Pages/Scoreboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/auth"  element={<Authentication/>}/>
          <Route path="/scoreboard"  element={<Scoreboard/>}/>
          <Route path="/" element={<Game />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
