import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import '../global.css' // Ensure global styles are correctly imported
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/src/redux/store'
import { setupDeepLinking } from '@/src/utils/deepLinking'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
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
