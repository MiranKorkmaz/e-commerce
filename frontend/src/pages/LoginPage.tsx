import React, { useState, createContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user-item";

axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";

export const UserContext = createContext<IUser | null>(null);

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState({});
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    const userLogin = async () => {
        const data = await axios.post<IUser>("/users/login", {
            email: email,
            password: password,
        });
        setLogin(data);
        const response = await axios.post("/users/login", { email, password });
        const token = response.data.token;
        setUserId(response.data._id);
        localStorage.setItem("backend3-ecom", token);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userLogin();
    };

    useEffect(() => {
        if (userId) {
            navigate(`/user/${userId}`);
            window.location.reload();
        } else {
            navigate(`/login`);
        }
    }, [navigate, userId]);

    return (
        <Container>
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="signup__form--title">Log in</h1>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Button type="submit">Log in</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
