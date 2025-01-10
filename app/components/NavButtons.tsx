import { LinkProps, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/AppText'

interface NavButtonsProps {
    leftButton?: React.ReactNode
    leftButtonHref?: LinkProps['href']
    leftButtonAction?: () => void
    leftButtonBack?: boolean

    rightButton?: React.ReactNode
    rightButtonHref?: LinkProps['href']
    rightButtonAction?: () => void
    rightButtonBack?: boolean
}

export default function NavButtons({
    leftButton,
    leftButtonHref,
    leftButtonAction,
    leftButtonBack,

    rightButton,
    rightButtonHref,
    rightButtonAction,
    rightButtonBack,
}: NavButtonsProps) {
    const router = useRouter()

    if (leftButtonBack) {
        leftButtonAction = () => {
            router.back()
        }
    } else if (leftButtonHref) {
        leftButtonAction = () => {
            router.push(leftButtonHref)
        }
    }

    if (rightButtonBack) {
        rightButtonAction = () => {
            router.back()
        }
    } else if (rightButtonHref) {
        rightButtonAction = () => {
            router.push(rightButtonHref)
        }
    }

    return (
        <View className="w-full flex-row justify-between items-center">
            <Pressable onPress={leftButtonAction}>
                <AppText className="text-foreground">{leftButton}</AppText>
            </Pressable>
            <Pressable onPress={rightButtonAction}>
                <AppText className="text-foreground">{rightButton}</AppText>
            </Pressable>
        </View>
    )
}
