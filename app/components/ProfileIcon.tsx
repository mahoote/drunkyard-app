import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'

interface ProfileIconProps {
    name: string
    size?: 'small' | 'medium' | 'large'
    circleColor?: string
    textColor?: string
}

/**
 * Allows you to create a profile icon with a letter inside a circle.
 * Three different sizes are available: small, medium, and large.
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
    let circleSize = 'h-11 w-11'
    let fontSize = 'display-xs-medium'

    if (size === 'medium') {
        circleSize = 'h-16 w-16'
        fontSize = 'display-sm-medium'
    } else if (size === 'large') {
        circleSize = 'h-20 w-20'
        fontSize = 'display-lg-medium'
    }

    return (
        <View
            className={`${circleColor} ${circleSize} flex items-center justify-center rounded-[50%]`}
        >
            <AppText size={fontSize} color={textColor} verticalAlign={true}>
                {name[0].toUpperCase()}
            </AppText>
        </View>
    )
}
