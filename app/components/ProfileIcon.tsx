import React from 'react'
import { Platform, View } from 'react-native'
import AppText from '@/app/components/AppText'

interface ProfileIconProps {
    name: string
    size?: 'small' | 'large'
    circleColor?: string
    textColor?: string
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

    const scale = size === 'large' ? 'scale-[2]' : ''

    return (
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
    )
}
