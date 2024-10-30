import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../state/SeeSearchModalSlice'
import { show } from '../state/SeeProductModalSlice'
import "../styles/StyleModalSearch.css"


export default function ModalForSearch() {
    const { data: products } = useSelector(state => state.getData)
    const [searchValue, SetSearchValue] = useState("")
    const [searchedProducts, setSetSearchedProducts] = useState([])
    const dispatch = useDispatch()

    const { showModal } = useSelector(state => state.searchModal)

    const handleOnChange = (event) => {
        SetSearchValue(event.target.value)
    }
    const search = () => {
        if (searchValue !== "") {
            setSetSearchedProducts(products.filter(product => {
                return product.title.toUpperCase().includes(searchValue.toUpperCase())

            }))
        }
        else {
            setSetSearchedProducts([])
        }

    }
    const closeAndReset = () => {
        dispatch(closeModal())
        setSetSearchedProducts([])
        SetSearchValue("")
    }

    const seeProduct = (product) => {
        dispatch(show(product))
    }

    useEffect(() => {
        search()
    }, [searchValue])
    return (
        <div>

            <Modal
                size="lg"
                show={showModal}
                onHide={closeAndReset}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Form className='flex-grow-1'>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-lg-2 flex-grow-1 "
                            aria-label="Search"
                            value={searchValue}
                            onChange={handleOnChange}
                        />

                    </Form>
                </Modal.Header>
                <Modal.Body>{searchedProducts.length === 0 ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>No Result</div>
                    :
                    searchedProducts.map((product) => (<div>
                        <div className='product-item' onClick={() => seeProduct(product)} >
                            {product.title}
                        </div>
                    </div>))
                }</Modal.Body>
            </Modal>
        </div>
    )

}
