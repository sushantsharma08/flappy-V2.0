import './App.css'
import Game from './Pages/Game'
import Authentication from './Pages/Authentication'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Scoreboard from './Pages/Scoreboard'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactGA from "react-ga";

const TRACKING_ID = "G-SFH1J85Y6T";
ReactGA.initialize(TRACKING_ID);

const client = new QueryClient();

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/" element={<Game />} />
          </Routes>
        </Router>
      </QueryClientProvider>

    </div>
  )
}

export default App
