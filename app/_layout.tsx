import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import '../global.css' // Ensure global styles are correctly imported
import { Provider, useDispatch } from 'react-redux'
import useDeepLinking from '@/app/hooks/useDeepLinking'
import { listenToAuthChanges } from '@/app/redux/authActions'
import { AppDispatch, store } from '@/app/redux/store'

function App() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(listenToAuthChanges()) // ✅ Listen for auth state changes
    }, [dispatch])

    useDeepLinking() // ✅ Handles deep linking and authentication

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'ios_from_right',
                    animationDuration: 250,
                    contentStyle: {
                        backgroundColor: '#030323',
                        alignItems: 'center',
                    },
                }}
            />
            <StatusBar style="light" />
        </>
    )
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
