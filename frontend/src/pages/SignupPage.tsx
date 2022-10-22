import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [signUp, setSignUp] = useState({});
    const navigate = useNavigate();

    const userSignUp = async () => {
        const { data } = await axios.post("/users/signup", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        setSignUp(data);
        console.log(data)
    }

    useEffect(() => {
        userSignUp();
    }, [])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userSignUp();
        console.log("You have signed up!")
        navigate("/login")
    }


  return (
    <Container>
    <Row>
        <Col md={6} className="signup__form--container">
            <Form style={{ width: "100%"}} onSubmit={handleSubmit}>
                <h1 className="signup__form--title">Create an account</h1>
                <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstName} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setFirstName(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastName} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setLastName(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                <Button type="submit">Sign Up</Button>
                </Form.Group>

            </Form>
        </Col>
    </Row>
</Container>
  )
}
