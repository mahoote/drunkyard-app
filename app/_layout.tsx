import { Slot } from 'expo-router'

import '../global.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'

export default function RootLayout() {
    const platformPadding = Platform.select({
        ios: 'pt-16',
        android: 'pt-12',
        default: 'pt-6', // Web
    })

    return (
        <BackgroundCircles className={platformPadding}>
            <StatusBar style="light" />
            <Slot />
        </BackgroundCircles>
    )
}
