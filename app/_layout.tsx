import { Link, Slot } from 'expo-router'

import '../global.css'
import React from 'react'
import { View } from 'react-native'

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
