import React, { useEffect, useState } from 'react'

const About = () => {

  const [loggedUser, setLoggedUser] = useState(false)
  

  useEffect(() => {
    // setInterval(() => {
    const user = localStorage.getItem('backend3-ecom')
    if (user) {
      setLoggedUser(true)
    } else {
      setLoggedUser(false)
    }
  // }, 500)
  }, [])

  return (
    <div>
        <h2>About Page</h2>
        <h3>This page has been produced by</h3>
        <h4>Zamir Cohen</h4>
        <h4>Miran Korkmaz</h4>
        {loggedUser ? (
              <h4>Panos Papopilpopopopulusniotis</h4>
              ) : (
              <p></p>
            )}
    </div>
  )
}

export default About