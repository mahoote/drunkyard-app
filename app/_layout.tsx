import { Link, Slot } from 'expo-router'

// Import your global CSS file
import '../global.css'
import { View } from 'react-native'
import React from 'react'

export default function RootLayout() {
    return (
        <View className="flex-1 justify-between items-center pb-8">
            <Slot />
            <View className="flex justify-around flex-row gap-2">
                <Link href="/">Home</Link>
                <Link href="/page-one">Page 1</Link>
            </View>
        </View>
    )
}
