import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../state/SeeBuyModalSlice'
import "../styles/ProductQuantity.css"
import { closeModal as closeSeeProduct } from '../state/SeeProductModalSlice'
import { remove } from '../state/CartSlice'


export default function ModalBuy() {

    const { showModal, product } = useSelector(state => state.buyModal)
    const [count, setCount] = useState(1)
    const dispatch = useDispatch()

    let discountPrice = (count * (product.price - (product.price * (product.discountPercentage / 100)))).toFixed(2)


    const increaseCount = () => {
        setCount(count + 1)
    }
    const decreaseCount = () => {
        setCount(count - 1)
    }

    const closeAndReset = () => {
        dispatch(closeModal())
        setCount(1)
    }

    const closeProduct = (totalPrice) => {
        dispatch(closeSeeProduct())
        closeAndReset()
        alert("Total:   $" + totalPrice + "\n \nThanks for Buying :) ");
        dispatch(remove(product))
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={closeAndReset}
                backdrop="static"
                bg="dark"
            >
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex justify-content-center align-items-center'>
                        <span style={{ marginRight: "15px" }}><h1>Total: </h1></span>
                        <span>${discountPrice}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Quantity</h4>
                    <div className='increase_and_decrease_container'>
                        <button className='increase_and_decrease' onClick={decreaseCount} disabled={count === 1}>-</button>
                        <div className='increase_and_decrease'>{count}</div>
                        <button className='increase_and_decrease' onClick={increaseCount} disabled={count === product.stock}>+</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { closeProduct(discountPrice) }}>Checkout</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
