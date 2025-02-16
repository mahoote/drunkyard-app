import '../global.css' // Ensure global styles are correctly imported
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider } from 'react-redux'
import { useAppLogic } from '@/src/hooks/useAppLogic'
import { store } from '@/src/redux/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

export function MainApp() {
    useAppLogic()

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
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
