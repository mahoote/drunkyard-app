import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'
import NavButtons from '@/app/components/NavButtons'

export default function Lobby() {
    return (
        <View className="flex-1 w-full items-center">
            <NavButtons
                leftButton={<FontAwesome name="chevron-left" size={24} />}
            />
            <AppText>lobby is working!</AppText>
        </View>
    )
}
