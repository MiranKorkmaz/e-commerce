import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user-item";

export function LoginPage() {

    const [userEmail, setuserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

const logInUser = async (userEmail: string, userPassword: string): Promise<void> => {
    const user: IUser = {
        email: userEmail,
        password: userPassword,
        firstName: "",
        lastName: ""
    }
    try {
        const response = await axios.post<any>("/users/login", user)
        console.log(response.data.email);
        const token = response.data.access_token;
        console.log(token);
        localStorage.setItem("backend3", token)
        navigate("/")
    } catch (err) {
        if (err) {
            setError("userEmail or password is wrong")
        }
    }
}

return (<div className="App">
    <header className='header'>
        <div>
            <Link to="/" className="link">Back to StartPage</Link>
        </div>
        <div>
            <h2>LogInPage</h2>
        </div>
        <div>

        </div>
    </header>
    <section>
        <div className="login">
            <div className="loginSpace">
                <div>
                    <label>Email: </label>
                    <input
                        className="inputField"
                        type="text"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => setuserEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        className="inputField"
                        type="text"
                        placeholder="Password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>
                <div className='buttonBox'>
                    <button className="buyButton" onClick={(e) => logInUser(userEmail, userPassword)}>Log In</button>
                </div>
                <div>
                    {error}
                </div>
            </div>
            <Link to="/register" className="linkRegister">Register a new user</Link>
        </div>
    </section>
</div>)
}

// import React, { useEffect, useState } from 'react'
// import { Container, Row, Col, Button } from 'react-bootstrap'
// import { Form } from 'react-bootstrap'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

// export const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     // const [login, setLogin] = useState({});
//     const navigate = useNavigate();

//     const userLogin = async () => {
//         console.log(`userLogin ${email} ${password}`)
//         const { data } = await axios.post("/users/login", {
//             email,
//             password
//         })
//         console.log(`userLogin ${data.email}`)
//         findByCredentials( data.email, data.password);
//         console.log(data);
//         navigate("/");
        
//     }

//   return (
//     <Container>
//     <Row>
//         <Col md={6} className="signup__form--container">
//             <Form style={{ width: "100%"}}>
//                 <h1 className="signup__form--title">Log in</h1>
                
//                 <Form.Group id="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     value={email} 
//                     required 
//                     onChange={(e) => setEmail(e.target.value)} />
//                 </Form.Group>
//                 <br />
//                 <Form.Group id="password">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     value={password} 
//                     required 
//                     onChange={(e) => setPassword(e.target.value)} />
//                 </Form.Group>
//                 <br />
//                 <Form.Group>
//                 <Button onClick={(e) => userLogin()}>Log in</Button>
//                 </Form.Group>

//             </Form>
//         </Col>
//     </Row>
// </Container>
//     )
// }
// function findByCredentials(email: string, password: string) {
//     throw new Error('Function not implemented.')
// }

