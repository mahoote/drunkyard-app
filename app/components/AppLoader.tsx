import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import { AppRootState } from '@/src/redux/store'

export default function AppLoader() {
    const { loadingMessage } = useSelector((state: AppRootState) => state.auth)

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
            <AppText>{loadingMessage}</AppText>
        </AppView>
    )
}
