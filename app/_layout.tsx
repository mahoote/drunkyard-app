import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import '../global.css'
import { Provider } from 'react-redux'
import { store } from '@/app/redux/store'

export default function RootLayout() {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}
