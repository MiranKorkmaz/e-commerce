import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap';

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const ProfilePage = () => {
  
  const [loggedUserFirstname, setLoggedUserFirstname] = useState("")
  const [loggedUserLastname, setLoggedUserLastname] = useState("")
  const [loggedUserEmail, setLoggedUserEmail] = useState("")
  const [loggedUserDeliveryAdress, setLoggedUserDeliveryAdress] = useState("")

  const [userUpdateFirstName, setUserUpdateFirstName] = useState("")
  const [userUpdateLastName, setUserUpdateLastName] = useState("")
  const [userUpdateEmail, setUserUpdateEmail] = useState<string>("");
  const [userUpdateAdress, setUserUpdateAdress] = useState<string>("");
  const [userUpdatePhone, setUserUpdatePhone] = useState<string>("");

  const { id } = useParams()
  const navigate = useNavigate()

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
      setLoggedUserDeliveryAdress(response.data.deliveryAdress)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    setLoggedUserDeliveryAdress("")
    setLoggedUserEmail("")
    setLoggedUserFirstname("")
    setLoggedUserLastname("")
    localStorage.removeItem("backend3-ecom")
    navigate("/")
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/user/${id}`, {
        firstName: userUpdateFirstName ? userUpdateFirstName : loggedUserFirstname,
        lastName: userUpdateLastName ? userUpdateLastName : loggedUserLastname,
        email: userUpdateEmail ? userUpdateEmail : loggedUserEmail,
        deliveryAdress: userUpdateAdress ? userUpdateAdress : loggedUserDeliveryAdress
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
    window.location.reload();
  }
   
  useEffect(() => { 
      getUser()
  }, [])


  return (
    <div>
            {!loggedUserEmail ? (
              <div>
              <h1>You are not logged in</h1>
              <h2>TOKEN: {token}</h2>
              <h2>LOGGED USER EMAIL: {loggedUserEmail}</h2>
            </div>
              ) : (
              <div>
                <div>
                    <h1>Profile</h1>
                    <br />
                    <h4>First name: <i>{loggedUserFirstname}</i></h4>
                    <h4>Last name: <i>{loggedUserLastname}</i></h4>
                    <h4>Email: <i>{loggedUserEmail}</i></h4>
                    <h4>Delivery adress: <i>{loggedUserDeliveryAdress}</i></h4>
                    <h4>Token: <i>{token}</i></h4>
                    <br />

                    <button onClick={handleLogout}>Log out</button>
                </div>
              <br />
              <hr />

            <div>
            <Container>
             <Row>
            <Col md={6} className="signup__form--container">
            <Form style={{ width: "100%"}} onSubmit={handleUpdate}>
                <h1 className="signup__form--title">Update user account</h1>
                <br />
                <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={userUpdateFirstName} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUserUpdateFirstName(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={userUpdateLastName} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUserUpdateLastName(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" value={userUpdatePhone} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUserUpdatePhone(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="deliveryAdress">
                    <Form.Label>Delivery Adress</Form.Label>
                    <Form.Control type="text" value={userUpdateAdress} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUserUpdateAdress(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={userUpdateEmail} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUserUpdateEmail(e.target.value)} />
                </Form.Group>
                <br />
                {/* <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)} />
                </Form.Group> */}
                <br />
                <Form.Group>
                <Button type="submit">Update</Button>
                </Form.Group>

              </Form>
              </Col>
            </Row>
            </Container>
            </div>

            </div>                  
            )}  



    </div>
  )
}



