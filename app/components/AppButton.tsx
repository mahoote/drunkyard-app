import React from 'react'
import { Pressable } from 'react-native'
import AppText from '@/app/components/AppText'

interface AppButtonProps {
    title: string
    size?: 'small' | 'large'
    fullWidth?: boolean
}

/**
 * Displays a custom button with a title.
 * Two different sizes are available: small and large.
 * @param title
 * @param size
 * @param fullWidth
 * @constructor
 */
export default function AppButton({
    title,
    size = 'large',
    fullWidth = true,
}: AppButtonProps) {
    const width = fullWidth ? 'w-full' : 'w-fit'

    let buttonStyles = 'rounded-2xl p-1 ios:p-2'
    let textSize = 'text-xl-semibold'

    if (size === 'large') {
        buttonStyles = 'rounded-2xl p-2 ios:p-3'
        textSize = 'display-sm-semibold'
    }

    return (
        <Pressable
            className={`${buttonStyles} ${width} justify-center bg-secondary-900`}
        >
            <AppText
                size={textSize}
                className="text-center"
                verticalAlign={true}
            >
                {title}
            </AppText>
        </Pressable>
    )
}
