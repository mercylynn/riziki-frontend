import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import './userComponents/Login.css';
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import NavBar from "./NavBar";


export default function Login () {
  const {user} = useContext(UserContext)
    return (
        <>
        {user?.username?<Navigate to={user.role=="user"?"/userprofile":"/employers"} />:null}
        <LoginForm />
        {/* <Test /> */}

         </>
      )

}


function LoginForm() {
  const {user,setUser} = useContext(UserContext)

  const [errors,setErrors] = useState()
  const [loginData,setLoginData] = useState({
    username:"",
    password:"",
  })

  function handleChange(e){
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value
        }
      )
    }

  function handleSubmit(e){
    e.preventDefault()

    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    })
    .then(resp=>{
      if(resp.ok){
        setErrors(false)
        return resp.json()
      }
      else {
        setErrors(true)
        setUser({})
      }
    })
    .then(data=>{
      setUser(data)
      console.log(user)
    }
      )
  }

  return(
   
    <div className="loginContainer">
      <div className="log-form-container">
          <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>

      <label htmlFor="username">username</label>
        <input
        id="username"
        name="username" 
        type= "text" 
        value={loginData.username}
        onChange={handleChange}
        placeholder="your username"
        required = 'required'
        />

      <label htmlFor="password">password</label>
        <input
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        type="password"
        placeholder="Enter password"
        required = 'required'
        />

      {errors&& <ErrorDiv />}

      <button type="submit">Log In</button>

  
      </form>
      <Link to="/signup" className="link-btn" >Don't have an account? Sign Up</Link>
  </div>
    </div>
    
    )
}

function ErrorDiv(){
  return(
    <div id="errorDiv">
      Incorrect username or password
    </div>
  )
}