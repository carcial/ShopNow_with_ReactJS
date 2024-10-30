import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    showModal: false,
    product: {}
}

const seeBuyModalSlice = createSlice({
    name: "buyModal",
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

export const { show, closeModal } = seeBuyModalSlice.actions
export default seeBuyModalSlice.reducer