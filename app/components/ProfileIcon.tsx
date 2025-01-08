import React from 'react'
import { Platform, View } from 'react-native'
import AppText from '@/app/components/AppText'

interface ProfileIconProps {
    name: string
    size?: 'small' | 'large'
    circleColor?: string
    textColor?: string
}

const iconSize = {
    small: 42,
    large: 72,
}

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

    const textSize =
        size === 'small' ? 'display-xs-medium' : 'display-md-medium'

    const circleWidth =
        size === 'large' ? `w-[${iconSize.large}px]` : `w-[${iconSize.small}px]`
    const circleHeight =
        size === 'large' ? `h-[${iconSize.large}px]` : `h-[${iconSize.small}px]`

    return (
        <View
            className={`flex items-center justify-center ${circleColor} rounded-[50%] ${circleWidth} ${circleHeight}`}
        >
            <AppText
                style={{ transform: [{ translateY }] }}
                size={textSize}
                color={textColor}
            >
                {name[0].toUpperCase()}
            </AppText>
        </View>
    )
}
