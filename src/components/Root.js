import React from 'react'
import { Provider } from 'react-redux'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import store from '../state/Store'

export default function Root() {
    return (
        <Provider store={store}>
            <Header />
            <Outlet />
        </Provider>
    )
}
