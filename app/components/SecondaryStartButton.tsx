import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/AppText'
import SquaresBackgroundImage from '@/assets/images/squares-background-1.svg'

interface SecondaryStartButtonProps {
    icon: React.ReactNode
    title: string
}

export default function SecondaryStartButton({
    icon,
    title,
}: SecondaryStartButtonProps) {
    return (
        <Pressable className="w-full justify-center items-center p-4 primary-50 bg-primary-500 rounded-3xl relative overflow-hidden">
            <View className="absolute inset-0">
                <SquaresBackgroundImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    color="#F0F1FD"
                />
            </View>
            {icon}
            <AppText size="display-xs-bold" color="text-background">
                {title}
            </AppText>
        </Pressable>
    )
}
