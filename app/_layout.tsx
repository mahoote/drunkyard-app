import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import '../global.css'

export default function RootLayout() {
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
