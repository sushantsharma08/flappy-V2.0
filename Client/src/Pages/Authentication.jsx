import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie"
import {useNavigate} from "react-router-dom"

function Authentication() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [,setCookies]=useCookies(["access_token"])
  // const navigate = useNavigate();


  const onSubmit = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username, password
      });
      
      setCookies("access_token",response.data.token);
      
      const {token,userID} = await response.data
      console.log(token);

      if (token) {
        alert("Login Successful");
        window.localStorage.setItem("userId",userID)
        const score = await axios.get(`http://localhost:3001/score/${userID}`);
        
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
      const user= await axios.post("http://localhost:3001/auth/register", {
        username, password
      }); 
      console.log(user);
      const userId= user.data._id
      // Create user Scorecard
      await axios.post(`http://localhost:3001/score`,{
        name:username,score:0,userId
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
    <>
      <h1>{props.title}</h1>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id='username'
          name='username'
          onChange={(e) => { props.setusername(e.target.value) }}
          value={props.username}
        />
        <br />
        <label htmlFor="password">Password</label>

        <input
          type="text"
          id='password'
          name='password'
          onChange={(e) => { props.setpassword(e.target.value) }}
          value={props.password}
        />
        <br />
        <button type="submit">{props.title}</button>
      </form>
    </>
  )
}


export default Authentication