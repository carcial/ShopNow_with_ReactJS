import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    product: {},
    showModal: false
}

const seeProductModalSlice = createSlice({
    name: "productModal",
    initialState,
    reducers: {
        show: (state, action) => {
            state.showModal = true
            state.product = action.payload
        },
        closeModal: (state) => {
            state.showModal = false
        }
    }
})

export const { show, closeModal } = seeProductModalSlice.actions
export default seeProductModalSlice.reducer