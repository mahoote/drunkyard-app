import { Slot } from 'expo-router'

import '../global.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import BackgroundCircles from '@/app/components/BackgroundCircles'

export default function RootLayout() {
    return (
        <BackgroundCircles>
            <StatusBar style="light" />
            <Slot />
        </BackgroundCircles>
    )
}
