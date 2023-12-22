import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import Jumbotron from "./Jumbotron/Index"
import Experiences from "./Experiences/WorkArea"

export default function ProfileDetail() {
    const [myProfile, setMyProfile] = useState({})
    const { id } = useParams()
    const [myId, setMyId] = useState("")
    const token = localStorage.getItem("token")

    const getMyProfile = useCallback(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then(setMyProfile)
            .then(console.log(myProfile))
    }, [id, token, myProfile])

    const getMyPersonalProfile = useCallback(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setMyId(data["_id"])
            })
    }, [token])

    useEffect(() => {
        getMyProfile()
        getMyPersonalProfile()
        window.scroll(0, 0)
    }, [getMyProfile, getMyPersonalProfile])

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <Jumbotron myProfile={myProfile} myId={myId} />
                    <Experiences userId={id} myId={myId} />
                </Col>
            </Row>
        </Container>
    )
}
