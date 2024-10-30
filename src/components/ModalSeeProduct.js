import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Image, Button } from 'react-bootstrap';
import { IconContext } from "react-icons"
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../state/SeeProductModalSlice';
import { closeModal as closeSearchModal } from '../state/SeeSearchModalSlice';
import { add } from '../state/CartSlice';
import { show } from '../state/SeeBuyModalSlice';
import ModalBuy from './ModalBuy';
import { useNavigate } from 'react-router-dom';



export default function ModalSeeProduct() {

    const { product, showModal } = useSelector(state => state.productModal)
    const { showModal: showSearchModal } = useSelector(state => state.searchModal)
    const productsInCart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate("")
    const [selectedImage, setSelectedImage] = useState('');
    const [showImages, setShowImages] = useState(false)

    let rate = []
    let allImages = product.images
    const newPrice = (product.price * (product.discountPercentage / 100))

    useEffect(() => {
        if (product) {
            setSelectedImage(product.thumbnail);
        }
    }, [product]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const closeAndReset = () => {
        dispatch(closeModal())
        setShowImages(false)
    }

    const openBuyModal = (product) => {
        dispatch(show(product))
    }
    const rating = () => {
        let i = 1
        let arr = []
        while (i <= product.rating) {
            arr.push(<FaStar />)
            i++
        }
        return arr
    }
    rate = rating()

    const disabledButton = () => {
        return productsInCart.some(element => element.id === product.id)
    }

    const addProductToCart = (selectedProduct) => {
        dispatch(add(selectedProduct))
        closeAndReset()
        navigate("/cart")
        if (showSearchModal) {
            dispatch(closeSearchModal())
        }
    }

    return (
        <>
            <ModalBuy />
            <Modal show={showModal} fullscreen={true} onHide={closeAndReset}>
                <Modal.Header closeButton >
                    <Modal.Title >{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div
                            className="image-container"
                            style={{
                                border: "2px solid gray",
                                width: '320px',
                                height: '300px',
                                marginBottom: "5px",
                                padding: "20px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image src={selectedImage} rounded style={{ width: "100%", height: "100%" }} />
                        </div>
                        {allImages?.length > 1 && <Button variant='secondary' onClick={() => setShowImages(!showImages)}>More Images...</Button>}
                        {allImages?.length > 1 && showImages && <Row style={{ border: "1px solid black", width: "auto", justifyContent: "center", alignItems: "center", borderRadius: "8px", marginTop: "5px" }}>
                            {allImages?.map((image, index) => (

                                <Col className="clickable-image" key={index} onClick={() => handleImageClick(image)}>
                                    <Image src={image} rounded style={{ width: "30px", height: "30px", margin: "8px" }} />
                                </Col>

                            ))}
                        </Row>}
                    </div>

                    <div style={{ margin: "5px", borderRadius: "5px", display: "flex", justifyContent: "center" }} >
                        <div style={{ border: "1px solid black", padding: "10px", borderRadius: "5px", width: "75%" }}>
                            <div>
                                <label style={{ fontWeight: "bold", marginRight: "15px" }}>Brand: </label>
                                <span>{product.brand ? product.brand : "No Brand"}</span>
                            </div>
                            <div>
                                <label style={{ fontWeight: "bold", marginRight: "15px" }}>Price: </label>
                                <span style={{ textDecoration: "line-through", marginRight: "8px" }}>${product.price} </span> <span>${(product.price - (newPrice)).toFixed(2)}</span>
                            </div>
                            <div>
                                <label style={{ fontWeight: "bold", marginRight: "15px" }}>Rating: </label>
                                {
                                    <IconContext.Provider value={{ className: "rate" }}>
                                        {rate.map((rt) => (
                                            <span>{rt}</span>
                                        ))}
                                    </IconContext.Provider>}
                            </div>
                            <div>
                                <label style={{ fontWeight: "bold", marginRight: "15px" }}>Stock: </label>
                                <span>{product.stock}</span>
                            </div>
                            <div className='d-flex'>
                                <label style={{ fontWeight: "bold", marginRight: "15px" }}>Description: </label>
                                <div style={{ width: "250px", overflow: "clip" }}>{product.description}</div>
                            </div>
                            <div className='d-flex' style={{ justifyContent: "center", alignContent: "center", padding: "10px" }}>
                                <Button onClick={() => openBuyModal(product)} style={{ marginRight: "20px" }}>Buy Now</Button>
                                <Button onClick={() => addProductToCart(product)} variant="outline-primary" disabled={disabledButton()}>Add to Cart</Button>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}
