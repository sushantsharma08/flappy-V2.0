import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
            <ul>
                <Link to="/">Game</Link>
                <Link to="/auth"><button>Login/Signup</button></Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar