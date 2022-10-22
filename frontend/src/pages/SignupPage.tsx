import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



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

                    <Form.Group>
                    <Button type="submit">Sign Up</Button>
                    </Form.Group>

                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default SignupPage


