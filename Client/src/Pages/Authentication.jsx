import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

function Authentication() {
  return (
    <div className='authentication'>
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [, setCookies] = useCookies(["access_token"])
  // const navigate = useNavigate();


  const onSubmit = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("https://flappy-v2-back.vercel.app/auth/login", {
        username, password
      });

      setCookies("access_token", response.data.token);

      const { token, userID } = await response.data
      console.log(token);

      if (token) {
        alert("Login Successful");
        window.localStorage.setItem("userId", userID)
        const score = await axios.get(`https://flappy-v2-back.vercel.app/score/${userID}`);

        console.log(score);

        // navigate("/");
      } else {
        alert("Login authentication failed")
      }

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Form
      username={username}
      setusername={setusername}
      password={password}
      setpassword={setpassword}
      title={"Login"}
      onSubmit={onSubmit}
    />
  )
}



const Register = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const onSubmit = async () => {
    event.preventDefault();
    try {
      // register User
      const user = await axios.post("https://flappy-v2-back.vercel.app/auth/register", {
        username, password
      });
      console.log(user);
      const userId = user.data._id
      // Create user Scorecard
      await axios.post(`https://flappy-v2-back.vercel.app/score`, {
        name: username, score: 5, userId
      })

      alert("Registration Successful")
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Form
      username={username}
      setusername={setusername}
      password={password}
      setpassword={setpassword}
      title={"Register"}
      onSubmit={onSubmit}
    />
  )
}


const Form = (props) => {
  return (
    <div className='auth_card'>
      <h1 className='auth_title' style={{ color: "#9E92CC" }}>{props.title}</h1>
      <hr />
      <form className='auth_form' onSubmit={props.onSubmit}>
        <div style={{marginTop:"1rem"}}>
          <div className='auth_inputFields'>
            <label className='auth_label' htmlFor="username">Username</label>

            <input
              className='auth_input'
              type="text"
              id='username'
              name='username'
              onChange={(e) => { props.setusername(e.target.value) }}
              value={props.username}
            />
          </div>
          <div className='auth_inputFields'>
            <label className='auth_label' htmlFor="password">Password</label>

            <input
              className='auth_input'
              type="text"
              id='password'
              name='password'
              onChange={(e) => { props.setpassword(e.target.value) }}
              value={props.password}
            />
          </div>
        </div>


        <button className='auth_button' type="submit">{props.title}</button>
      </form>
    </div >
  )
}


export default Authentication