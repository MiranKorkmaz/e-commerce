import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { response } from 'express'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const ProfilePage = () => {

  const [loggedUserFirstname, setLoggedUserFirstname] = useState("")
  const [loggedUserLastname, setLoggedUserLastname] = useState("")
  const [loggedUserEmail, setLoggedUserEmail] = useState("")

  const navigate = useNavigate();
  
  const getUser = async () => {
    const response = await axios.get("http://localhost:4000/users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("backend3-ecom")}`
      }
    })
    console.log(response.data)
    setLoggedUserFirstname(response.data.firstname)
    setLoggedUserLastname(response.data.lastname)
    setLoggedUserEmail(response.data.email)
  }

    
  function handleOnClick() {
    localStorage.removeItem("backend3-ecom")
    setLoggedUserFirstname("")
    setLoggedUserLastname("")
    setLoggedUserEmail("")
    navigate("/")
  };

  useEffect(() => {
    const interval = setInterval(() => {
        getUser()
    }, 2000)
    return () => clearInterval(interval)
}, []);


  return (
    <div>
            {loggedUserEmail ? (
                <div>
                    <h1>Profile</h1>
                    <p>Firstname: {loggedUserFirstname}</p>
                    <p>Lastname: {loggedUserLastname}</p>
                    <p>Email: {loggedUserEmail}</p>
                    <button onClick={handleOnClick}>Log out</button>
                </div>
            ) : (
                <div>
                    <h1>Profile</h1>
                    <p>You are not logged in</p>
                </div>
            )}  
    </div>
  )

}
