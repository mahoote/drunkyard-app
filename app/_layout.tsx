import { Slot } from 'expo-router'

import '../global.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, ScrollView, View } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'

export default function RootLayout() {
    const platformPadding = Platform.select({
        ios: 'pt-16',
        android: 'pt-12',
        default: 'pt-6', // Web
    })

    return (
        <View className="flex-1 w-full h-full relative overflow-hidden bg-background">
            <BackgroundCircles />
            <ScrollView
                className={`flex-1 z-10 ${platformPadding}`}
                bounces={false}
            >
                <StatusBar style="light" />
                <Slot />
            </ScrollView>
        </View>
    )
}
