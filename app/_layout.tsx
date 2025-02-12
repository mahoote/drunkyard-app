import '../global.css' // Ensure global styles are correctly imported
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { fetchWebAppUrl } from '@/src/redux/slices/webUrlSlice'
import { store, useAppDispatch } from '@/src/redux/store'
import { setupDeepLinking } from '@/src/utils/deepLinking'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWebAppUrl())
        return setupDeepLinking(dispatch)
    }, [dispatch])

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
