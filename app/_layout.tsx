import { Slot } from 'expo-router'

import '../global.css'
import React from 'react'
import BackgroundCircles from '@/app/components/BackgroundCircles'

export default function RootLayout() {
    return (
        <BackgroundCircles>
            <Slot />
        </BackgroundCircles>
    )
}
