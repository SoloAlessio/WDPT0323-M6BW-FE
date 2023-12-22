import { Container, Row, Col } from "react-bootstrap"
import { useCallback, useEffect, useState } from "react"
import Jumbotron from "./Jumbotron/Index.jsx"
import Experiences from "./Experiences/WorkArea.jsx"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import { dotStream } from "ldrs"
import { useNavigate } from "react-router-dom"

export default function Main() {
    dotStream.register()
    const navigate = useNavigate()
    const [allProfiles, setAllProfiles] = useState("")
    const [myProfile, setMyProfile] = useState("")
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    const getMyProfile = useCallback(async () => {
        let response = await fetch(
            `${process.env.REACT_APP_ENDPOINT_URL}/profile/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (response.ok) {
            let data = await response.json()
            setMyProfile(data)
        } else {
            throw new Error("Error")
        }
    }, [token])

    const getAllProfiles = useCallback(async () => {
        let response = await fetch(
            `${process.env.REACT_APP_ENDPOINT_URL}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (response.ok) {
            let data = await response.json()
            setAllProfiles(data)
        } else {
            throw new Error("Error")
        }
    }, [token])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        getMyProfile()
        getAllProfiles()
        window.scrollTo(0, 0)
    }, [getMyProfile, getAllProfiles, token])

    return (
        <Container className="mt-4">
            <Row>
                <Col lg={8}>
                    <Jumbotron
                        myProfile={myProfile}
                        getMyProfile={getMyProfile}
                    />
                    {myProfile && <Experiences userId={userId} />}
                </Col>
                <Col lg={4}>
                    <Container className="bg-white border rounded-3 p-3 mt-2 mt-lg-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-semibold mb-2">
                                Lingua del Profilo
                            </p>
                            <Icon.PencilSquare
                                style={{ cursor: "pointer" }}
                                onClick={() => alert("Work in Progress...")}
                            />
                        </div>
                        <p className="text-secondary fs-7">Impostazioni</p>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-semibold mb-2">
                                Public profile & URL
                            </p>
                            <Icon.PencilSquare
                                style={{ cursor: "pointer" }}
                                onClick={() => alert("Work in Progress...")}
                            />
                        </div>
                        <p className="text-secondary fs-7">
                            https://www.linkedin/{myProfile["name"]}-
                            {myProfile["surname"]}
                        </p>
                    </Container>

                    <Container
                        fluid
                        className="bg-white border rounded-3 p-3 mt-2"
                    >
                        <p className="fw-semibold mb-0">
                            Persone che potresti conoscere
                        </p>
                        <p className="text-secondary">
                            Dalla tua scuola o università
                        </p>
                        <Container fluid>
                            {allProfiles ? (
                                allProfiles.map((p) => (
                                    <Link
                                        to={`/profile/${p._id}`}
                                        key={p._id}
                                        className="text-decoration-none"
                                        style={{ color: "unset" }}
                                    >
                                        <Row className="py-2 g-2">
                                            <Col xs="auto">
                                                <img
                                                    src={
                                                        p.image
                                                            ? p.image
                                                            : "https://picsum.photos/200/300"
                                                    }
                                                    width={"48px"}
                                                    height={"48px"}
                                                    alt=""
                                                    className="rounded-circle object-fit-cover me-2"
                                                />
                                            </Col>
                                            <Col>
                                                <p className="fw-medium mb-0">
                                                    {p.name} {p.surname}
                                                </p>
                                                <p
                                                    className="text-secondary mb-0"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {p.title}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                            ) : (
                                <Container fluid className="text-center py-4">
                                    <l-dot-stream
                                        size="60"
                                        speed="2.5"
                                        color="#0a66c2"
                                    ></l-dot-stream>
                                </Container>
                            )}
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
