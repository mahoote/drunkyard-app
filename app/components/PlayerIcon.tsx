import React from 'react'
import { View } from 'react-native'
import ProfileIcon from '@/app/components/ProfileIcon'
import AppText from '@/app/components/text/AppText'

interface PlayerIconProps {
    name: string
    size?: 'small' | 'medium' | 'large'
    showAsHost?: boolean
}

/**
 * PlayerIcon is a component that displays a profile icon with a name below it.
 * The name is displayed in a text size that corresponds to the size of the icon.
 * @param props
 * @constructor
 */
export default function PlayerIcon({
    name,
    size,
    showAsHost,
}: PlayerIconProps) {
    let fontSize: string | undefined

    if (size === 'medium') {
        fontSize = 'text-lg-regular'
    } else if (size === 'large') {
        fontSize = 'text-xl-regular'
    }

    return (
        <View className="items-center gap-2">
            <ProfileIcon name={name} showAsHost={showAsHost} />
            {fontSize && <AppText size={fontSize}>{name}</AppText>}
        </View>
    )
}
