import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  return (
    <div className='navbar'>
      <div className='nav_title'>
        <Link to="/">Flappy Bird</Link>
      </div>
      <nav ref={navRef}>
        <ul>
          <Link className='li' to="/">Game</Link>
          <Link className='li' to="/scoreboard">Scoreboard</Link>
          {!cookies.access_token ?
            <Link className='li' to="/auth">
              <button className='login'>Login/Signup</button>
            </Link> : (
              <button className='logout'
                onClick={Logout}>LogOut</button>
            )
          }
        </ul>
        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn' onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  )
}

export default Navbar