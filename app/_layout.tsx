import { Link, Slot } from 'expo-router'

import '../global.css'
import React from 'react'
import { View } from 'react-native'
import BackgroundCircles from '@/app/components/ui/BackgroundCircles'

export default function RootLayout() {
    return (
        <BackgroundCircles>
            <View className="flex-1 justify-between items-center pb-8">
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
        </BackgroundCircles>
    )
}
