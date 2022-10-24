import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {

  const [loggedUserFirstname, setLoggedUserFirstname] = useState("")
  const [loggedUserLastname, setLoggedUserLastname] = useState("")
  const [loggedUserEmail, setLoggedUserEmail] = useState("")

  const navigate = useNavigate();

  const token = localStorage.getItem("backend3-ecom")

  const fetchUser = async () => {
    const response = await fetch("http://localhost:4000/users/", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await response.json()
    setLoggedUserFirstname(data.firstname)
    setLoggedUserLastname(data.lastname)
    setLoggedUserEmail(data.email)
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
        fetchUser()
    }, 1000)
    return () => clearInterval(interval)
}, []);


  return (
    <div>
            {loggedUserFirstname && loggedUserLastname && loggedUserEmail ? (
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
