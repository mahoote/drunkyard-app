import { Link, LinkProps } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'

interface NavButtonsProps {
    leftButton?: React.ReactNode
    leftButtonHref?: LinkProps['href']
    rightButton?: React.ReactNode
    rightButtonHref?: LinkProps['href']
}

export default function NavButtons({
    leftButton,
    leftButtonHref = '/',
    rightButton,
    rightButtonHref = '/',
}: NavButtonsProps) {
    return (
        <View className="w-full flex-row justify-between items-center">
            <Link href={leftButtonHref}>
                <AppText className="text-foreground">{leftButton}</AppText>
            </Link>
            <Link href={rightButtonHref}>
                <AppText className="text-foreground">{rightButton}</AppText>
            </Link>
        </View>
    )
}
