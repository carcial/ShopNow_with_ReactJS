import React, { useEffect } from 'react'
import { fetchedData } from '../state/FetchData'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Container, Card } from 'react-bootstrap'
import ModalSeeProduct from './ModalSeeProduct'
import { show } from '../state/SeeProductModalSlice'


export default function AllProducts() {

    const dispatch = useDispatch()
    const { data: products, isloading, error } = useSelector(state => state.getData)


    const showProduct = (product) => {
        dispatch(show(product))
    }

    useEffect(() => {
        dispatch(fetchedData())
    }, [])

    return (
        <div>
            <ModalSeeProduct />
            <Container>
                {error ?
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Alert variant='danger' style={{ maxWidth: '400px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <Alert.Heading className="text-center">Oops! Something went wrong.</Alert.Heading>
                            <p className="text-center">
                                We apologize for the inconvenience. Please try again later.
                            </p>
                        </Alert>
                    </div>
                    :
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {isloading ?
                            <h1>Loading...</h1>
                            :
                            products.map(product => (

                                <div className='col g-4' key={product.id}>
                                    <Card className='h-100' style={{ cursor: "pointer" }} onClick={() => { showProduct(product) }}>
                                        <div className='text-center'><Card.Img variant="top" src={product.thumbnail} style={{ width: "130px", height: "100px", marginTop: "10px" }} /></div>
                                        <Card.Body>
                                            <Card.Title className='text-center'>{product.title}</Card.Title>
                                            <Card.Text className='text-center'>
                                                <span style={{ textDecoration: "line-through", marginRight: "8px" }}>${product.price} </span> {<span>${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span>}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                            ))
                        }
                    </div>
                }
            </Container>
        </div>
    )
}
