import React from 'react'
import { View } from 'react-native'

interface NavButtonsProps {
    leftButton?: React.ReactNode
    rightButton?: React.ReactNode
}

export default function NavButtons({
    leftButton,
    rightButton,
}: NavButtonsProps) {
    return (
        <View className="w-full flex-row justify-between items-center">
            <View>{leftButton}</View>
            <View>{rightButton}</View>
        </View>
    )
}
