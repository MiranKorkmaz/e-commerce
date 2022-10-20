import { sign } from 'crypto'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function SignupPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(firstName, lastName, email, password)

        const payload = {
            firstName,
            lastName,
            email,
            password,
        }

        // We want to send the data
        const url = 'http://localhost:3001'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate('/')
        })

    }

  return (
    <Container>
        <Row>
            <Col md={6} className="signup__form--container">
                <Form style={{ width: "100%"}} onSubmit={handleSubmit}>
                    <h1 className="signup__form--title">Create an account</h1>
                    <Form.Group id="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button className="signup__form--button" type="submit">Sign Up</Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
