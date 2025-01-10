import React from 'react'
import { Pressable } from 'react-native'
import AppText from '@/app/components/AppText'

interface AppButtonProps {
    title: string
}

/**
 * Displays a custom button with a title.
 * @param title
 * @constructor
 */
export default function AppButton({ title }: AppButtonProps) {
    return (
        <Pressable className="w-full justify-center bg-secondary-900 rounded-3xl p-3 ios:p-5">
            <AppText
                size="display-sm-semibold"
                className="text-center"
                verticalAlign={true}
            >
                {title}
            </AppText>
        </Pressable>
    )
}
