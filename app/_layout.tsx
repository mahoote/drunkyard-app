import { Link, Slot } from 'expo-router'

import '../global.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'

export default function RootLayout() {
    return (
        <View className="bg-background flex-1 justify-between items-center pb-8">
            <StatusBar style="auto" />
            <Slot />
            <View className="flex justify-around flex-row gap-2">
                <Link href="/" className="text-foreground">
                    Home
                </Link>
                <Link href="/page-one" className="text-foreground">
                    Page 1
                </Link>
            </View>
        </View>
    )
}
