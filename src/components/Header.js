import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsCart } from 'react-icons/bs'
import ModalForSearch from './ModalForSearch'
import { show } from '../state/SeeSearchModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Header() {

    const productsInCart = useSelector(state => state.cart)

    const dispatch = useDispatch()


    const showSeachBar = () => {
        dispatch(show())
    }




    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid >
                <Navbar.Brand to={"/"} as={Link}>ShopNow</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link eventKey={2} to={"/"} as={Link}>Home</Nav.Link>
                    </Nav>


                    <IconContext.Provider value={{ className: "cart" }}>

                        <Button eventKey={2} variant="outline-success" onClick={() => showSeachBar()} style={{ marginRight: "30px" }}>Search</Button>

                        <Nav.Link eventKey={2} to={"/cart"} as={Link} style={{ color: "white", width: "50px", height: "50px", display: "flex", alignItems: "center" }}>
                            <BsCart /><span style={{
                                color: "black",
                                border: "1px solid white",
                                padding: "3px",
                                borderRadius: "50%",
                                background: "white",
                                fontWeight: "bold",
                                marginLeft: "2px",
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "24px",  // You can adjust this value
                                height: "24px", // You can adjust this value
                                minWidth: "24px", // Ensures the circle doesn't get too small
                                minHeight: "24px", // Ensures the circle doesn't get too small
                                textAlign: "center",
                                lineHeight: "24px" //
                            }}>{productsInCart.length}</span>
                        </Nav.Link>
                    </IconContext.Provider>


                </Navbar.Collapse>
            </Container>
            <ModalForSearch />

        </Navbar>

    )
}
