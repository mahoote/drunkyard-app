import { Slot } from 'expo-router'

import '../global.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'

export default function RootLayout() {
    return (
        <View className="flex-1 items-center w-full h-full relative overflow-hidden bg-background">
            <BackgroundCircles />
            <StatusBar style="light" />
            <View className="flex-1 w-full items-center max-w-lg">
                <Slot />
            </View>
        </View>
    )
}
