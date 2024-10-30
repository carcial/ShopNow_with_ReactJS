import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showModal: false,
}

const seeSearchModalSlice = createSlice({
    name: "searchModal",
    initialState,
    reducers: {
        show: (state) => {
            state.showModal = true
        },
        closeModal: (state) => {
            state.showModal = false
        }
    }
})

export const { show, closeModal } = seeSearchModalSlice.actions
export default seeSearchModalSlice.reducer