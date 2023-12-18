import React from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("LOGIN")
        navigate("/")
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
                                required
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
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-3"
                        >
                            Login
                        </Button>
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
