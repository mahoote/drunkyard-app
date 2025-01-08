import React from 'react'
import { Platform, View } from 'react-native'
import AppText from '@/app/components/AppText'

interface ProfileIconProps {
    name: string
    size?: 'small' | 'medium' | 'large'
    circleColor?: string
    textColor?: string
}

/**
 * Allows you to create a profile icon with a letter inside a circle.
 * Scales the icon based on the size prop.
 * Does calculations to make the icon scale properly on all platforms.
 * @param name
 * @param size
 * @param circleColor
 * @param textColor
 * @constructor
 */
export default function ProfileIcon({
    name,
    size = 'small',
    circleColor = 'bg-avatar-5',
    textColor = 'text-background',
}: ProfileIconProps) {
    const translateY = Platform.select({
        ios: 2,
        android: 2,
        default: 0, // Web
    }) as number

    const defaultSizePx = 44

    let multiplier = 1
    let scale = ''
    let scaleMultiplied: number

    switch (size) {
        case 'large':
            multiplier = 2
            scale = `scale-[${multiplier}]`
            break
        case 'medium':
            multiplier = 1.5
            scale = `scale-[${multiplier}]`
            break
    }

    scaleMultiplied = defaultSizePx * multiplier

    return (
        <View
            className={`${scaleMultiplied} items-center justify-center`}
            style={{ width: scaleMultiplied, height: scaleMultiplied }}
        >
            <View
                className={`${circleColor} ${scale} flex items-center justify-center rounded-[50%] w-11 h-11`}
            >
                <AppText
                    style={{ transform: [{ translateY }] }}
                    size="display-xs-medium"
                    color={textColor}
                >
                    {name[0].toUpperCase()}
                </AppText>
            </View>
        </View>
    )
}
