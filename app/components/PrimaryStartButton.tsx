import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from '@/app/components/AppText'
import BeersIcon from '@/assets/icons/beers.svg'
import SquaresBackgroundImage from '@/assets/images/squares-background-1.svg'

export default function PrimaryStartButton() {
    return (
        <Pressable className="relative w-full px-3 py-6 bg-secondary-900 flex-row justify-center items-center rounded-3xl overflow-hidden">
            <View className="absolute inset-0">
                <SquaresBackgroundImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    color="#F0F1FD"
                />
            </View>
            <View className="w-full flex-row justify-evenly items-center">
                <AppText
                    size="display-md-bold"
                    className="max-w-40 text-center"
                >
                    SETT I GANG!
                </AppText>
                <BeersIcon width={113} height={115} fill="blue" />
            </View>
        </Pressable>
    )
}
