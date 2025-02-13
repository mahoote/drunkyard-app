import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform, View } from 'react-native'

interface GradientBackgroundViewProps {
    children: React.ReactNode
    gradientBackgroundColor?: [number, number, number]
    defaultHeight?: number
    iosHeight?: number
}

export default function GradientBackgroundView({
    children,
    defaultHeight,
    iosHeight,
    gradientBackgroundColor = [1, 0, 0],
}: GradientBackgroundViewProps) {
    let osHeight = defaultHeight

    if (iosHeight && Platform.OS === 'ios') {
        osHeight = iosHeight
    }

    return (
        <View className="w-full">
            <LinearGradient
                colors={[
                    `rgba(${gradientBackgroundColor[0]}, ${gradientBackgroundColor[1]}, ${gradientBackgroundColor[2]}, 0)`,
                    `rgba(${gradientBackgroundColor[0]}, ${gradientBackgroundColor[1]}, ${gradientBackgroundColor[2]}, 1)`,
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.6 }} // Transition from transparent to color starts at 60% of the height
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: osHeight,
                }}
                pointerEvents="none" // Ensures it doesn't block interaction
            />
            {children}
        </View>
    )
}
