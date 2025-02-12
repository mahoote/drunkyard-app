import '../global.css' // Ensure global styles are correctly imported
import React from 'react'
import { Provider } from 'react-redux'
import { MainApp } from '@/app/MainApp'
import { store } from '@/src/redux/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}
