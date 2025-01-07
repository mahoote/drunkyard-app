import React from 'react'
import { Pressable } from 'react-native'
import AppText from '@/app/components/AppText'

export default function StartGameButton() {
    return (
        <Pressable className="w-full p-8 bg-secondary-900">
            <AppText size="display-md-bold">SETT I GANG!</AppText>
        </Pressable>
    )
}
