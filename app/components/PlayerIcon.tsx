import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'
import ProfileIcon from '@/app/components/ProfileIcon'

interface PlayerIconProps {
    name: string
    size?: 'small' | 'medium' | 'large'
}

/**
 * PlayerIcon is a component that displays a profile icon with a name below it.
 * The name is displayed in a text size that corresponds to the size of the icon.
 * @param props
 * @constructor
 */
export default function PlayerIcon(props: PlayerIconProps) {
    let fontSize: string | undefined

    if (props.size === 'medium') {
        fontSize = 'text-lg-regular'
    } else if (props.size === 'large') {
        fontSize = 'text-xl-regular'
    }

    return (
        <View className="items-center gap-2">
            <ProfileIcon {...props} />
            {fontSize && <AppText size={fontSize}>{props.name}</AppText>}
        </View>
    )
}
