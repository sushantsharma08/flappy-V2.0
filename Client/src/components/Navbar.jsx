import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <nav>
            <ul>
                <Link className='li' to="/">Game</Link>
                <Link className='li' to="/scoreboard">Scoreboard</Link>
                <Link className='li' to="/auth"><button className='login'>Login/Signup</button></Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar