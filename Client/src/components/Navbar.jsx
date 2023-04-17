import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = ()=>{
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }

  return (
    <div className='navbar'>
        <nav>
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
        </nav>
    </div>
  )
}

export default Navbar