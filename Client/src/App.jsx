import { useState } from 'react'
import './App.css'
import Game from './Pages/Game'
import Authentication from './Pages/Authentication'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* Hello */}
      {/* <Game/> */}
      <Authentication/>
    </div>
  )
}

export default App
