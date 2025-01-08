import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'
import ProfileCircleIcon from '@/assets/icons/profile-circle.svg'

interface ProfileIconProps {
    name: string
    size?: 42 | 72
    color?: string
}

export default function ProfileIcon({
    name,
    size = 42,
    color = '#B5A3D0',
}: ProfileIconProps) {
    const textSize = size === 42 ? 'display-xs-medium' : 'display-md-medium'

    return (
        <View className="relative justify-center items-center">
            <ProfileCircleIcon width={size} height={size} color={color} />
            <View className="absolute inset-0 justify-center items-center">
                <AppText
                    color="text-background"
                    size={textSize}
                    style={{ lineHeight: size }}
                >
                    {name[0].toUpperCase()}
                </AppText>
            </View>
        </View>
    )
}
