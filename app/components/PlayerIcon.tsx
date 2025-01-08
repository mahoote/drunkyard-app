import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'
import ProfileIcon from '@/app/components/ProfileIcon'

interface PlayerIconProps {
    name: string
}

export default function PlayerIcon(props: PlayerIconProps) {
    return (
        <View className="items-center gap-2">
            <ProfileIcon size="medium" {...props} />
            <AppText size="text-sm-regular">{props.name}</AppText>
        </View>
    )
}
