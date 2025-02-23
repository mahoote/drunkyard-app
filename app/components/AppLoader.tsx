import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'

interface AppLoaderProps {
    title?: string
}

export default function AppLoader({ title = 'Laster inn...' }: AppLoaderProps) {
    return (
        <AppView className="flex-1 items-center justify-center">
            <View className="w-[300] h-[300]">
                <LottieView
                    source={require('@/assets/animations/drinks.json')}
                    autoPlay
                    loop
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <AppText>{title}</AppText>
        </AppView>
    )
}
