import { LinkProps, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/text/AppText'

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

/**
 * Displays two navigation buttons at each side of the screen.
 * Can be used to navigate between screens or do an action.
 * @param leftButton
 * @param leftButtonHref
 * @param leftButtonAction
 * @param leftButtonBack
 * @param rightButton
 * @param rightButtonHref
 * @param rightButtonAction
 * @param rightButtonBack
 * @constructor
 */
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
    const [leftButtonDisabled, setLeftButtonDisabled] = useState<boolean>(false)
    const [rightButtonDisabled, setRightButtonDisabled] =
        useState<boolean>(false)

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

    /**
     * Disable buttons if the router can't go back and the button is a back button
     */
    useEffect(() => {
        setLeftButtonDisabled(!router.canGoBack() && !!leftButtonBack)
        setRightButtonDisabled(!router.canGoBack() && !!rightButtonBack)
    }, [router.canGoBack(), leftButtonBack, rightButtonBack])

    return (
        <View className="w-full flex-row justify-between items-center">
            <Pressable
                onPress={leftButtonAction}
                disabled={leftButtonDisabled}
                className="p-2"
            >
                <AppText
                    color={
                        leftButtonDisabled
                            ? 'text-background'
                            : 'text-foreground'
                    }
                    className="min-h-[24px]"
                >
                    {leftButton}
                </AppText>
            </Pressable>
            <Pressable
                onPress={rightButtonAction}
                disabled={rightButtonDisabled}
                className="p-2"
            >
                <AppText
                    color={
                        rightButtonDisabled
                            ? 'text-background'
                            : 'text-foreground'
                    }
                    className="min-h-[24px]"
                >
                    {rightButton}
                </AppText>
            </Pressable>
        </View>
    )
}
