import React from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useState } from "react"
import { GoogleLoginButton } from "react-social-login-buttons"

function Login() {
    const navigate = useNavigate()
    const [body, setBody] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(
            `${process.env.REACT_APP_ENDPOINT_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        )
        if (response.ok) {
            let data = await response.json()
            localStorage.setItem("token", data.token)
            localStorage.setItem("userId", data.payload.id)
            navigate("/")
        } else {
            document.getElementById("error").innerHTML = "Wrong Credentaials!"
            setBody({ ...body, password: "" })
        }
    }

    return (
        <Container>
            <Row>
                <Col md={4} className="mx-auto my-5 rounded p-4 bg-white">
                    <h4 className="mb-4">Login</h4>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={body.email}
                                required
                                onInput={(e) =>
                                    setBody({ ...body, email: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="formBasicPassword"
                            className="mb-3"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={body.password}
                                required
                                onInput={(e) =>
                                    setBody({
                                        ...body,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <p
                            id="error"
                            className="text-danger mt-3 mb-0 fw-semibold text-center"
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-3"
                        >
                            Login
                        </Button>
                        <GoogleLoginButton
                            className="mt-4 fs-6"
                            onClick={() => {
                                window.location.assign(
                                    `api/profile/oauth-callback`
                                )
                            }}
                        ></GoogleLoginButton>
                        <div className="text-center mt-3 w-100">
                            <Link
                                to="/register"
                                className="text-decoration-none"
                            >
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
