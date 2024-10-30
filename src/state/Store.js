import { configureStore } from "@reduxjs/toolkit";
import FetchData from "./FetchData";
import SeeSearchModalSlice from "./SeeSearchModalSlice";
import SeeProductModalSlice from "./SeeProductModalSlice";
import CartSlice from "./CartSlice";
import SeeBuyModalSlice from "./SeeBuyModalSlice";


const store = configureStore({
    reducer: {
        getData: FetchData,
        searchModal: SeeSearchModalSlice,
        productModal: SeeProductModalSlice,
        buyModal: SeeBuyModalSlice,
        cart: CartSlice
    }
})

export default store