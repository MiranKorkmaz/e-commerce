import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const ProfilePage = () => {
  
  const [loggedUserFirstname, setLoggedUserFirstname] = useState("")
  const [loggedUserLastname, setLoggedUserLastname] = useState("")
  const [loggedUserEmail, setLoggedUserEmail] = useState("")

  const { id } = useParams()
  
  // const id = user._id
  console.log(id)

  const token = localStorage.getItem("backend3-ecom")

  
  const getUser = async () => {
    try {
      const response = await axios.get(`/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLoggedUserFirstname(response.data.firstName)
      setLoggedUserLastname(response.data.lastName)
      setLoggedUserEmail(response.data.email)
    }
    catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => { 
    getUser()
  }, [])

//   useEffect(() => {
//     const interval = setInterval(() => {
//         getUser()
//     }, 2000)
//     return () => clearInterval(interval)
// }, []);


  return (
    <div>
            {/* {loggedUserEmail ? ( */}
                <div>
                    <h1>Profile</h1>
                    <p>{token}</p>
                    <p>Firstname: {loggedUserFirstname}</p>
                    <p>Lastname: {loggedUserLastname}</p>
                    <p>Email: {loggedUserEmail}</p>
                    {/* <button onClick={handleOnClick}>Log out</button> */}
                    {/* <p>User email: {user?.email}</p> */}
                </div>
            {/* ) : (
                <div>
                    <h1>Profile</h1>
                    <p>You are not logged in</p>
                    
                </div>
            )}   */}
    </div>
  )
}



