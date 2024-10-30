import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ModalSeeProduct from './ModalSeeProduct'
import { show } from '../state/SeeProductModalSlice'
import { FaWindowClose } from "react-icons/fa";
import { remove } from '../state/CartSlice'


export default function Cart() {

    const dispatch = useDispatch()
    const productsInCart = useSelector(state => state.cart)

    const showProduct = (product) => {
        dispatch(show(product))
    }

    const removeProductFromCart = (product) => {
        dispatch(remove(product))
    }

    return (
        <>
            <ModalSeeProduct />
            <Container>
                {productsInCart.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                        <h1>Empty Cart</h1>
                    </div>
                    :
                    <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4'>
                        {productsInCart.map(product => (
                            <div className='col g-4' key={product.id} style={{ position: "relative", cursor: "pointer" }}>
                                <Card className='h-100' onClick={() => { showProduct(product) }} >
                                    <div className='text-center'>
                                        <Card.Img variant="top" src={product?.thumbnail} style={{ width: "130px", height: "100px", marginTop: "10px" }} />
                                    </div>
                                    <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <span style={{ textDecoration: "line-through", marginRight: "8px" }}>${product.price} </span> <span>${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <FaWindowClose style={{ position: "absolute", width: "24px", height: "24px", right: "12px", top: "-1px", bottom: "5px" }} onClick={() => removeProductFromCart(product)} />
                            </div>
                        ))}
                    </div>}
            </Container>
        </>
    )
}
