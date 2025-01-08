import React from 'react'
import { View } from 'react-native'
import CirclesBackgroundImage from '@/assets/images/circles-background-1.svg'

export default function BackgroundCircles() {
    return (
        <View className="absolute inset-0">
            <CirclesBackgroundImage
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                color="white"
            />
        </View>
    )
}
