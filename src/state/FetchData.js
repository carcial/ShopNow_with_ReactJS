import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    isLoading: false,
    error: false
}

const FetchData = createSlice({
    name: "status",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchedData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchedData.fulfilled, (state, action) => {
                state.data = action.payload.products
                state.isLoading = false
            })
            .addCase(fetchedData.rejected, (state) => {
                state.error = true
            })
    }
})

export default FetchData.reducer

export const fetchedData = createAsyncThunk("getData", async () => {
    const response = await fetch("https://dummyjson.com/products");
    const result = await response.json();
    return result
})