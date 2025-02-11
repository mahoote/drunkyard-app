import Constants from 'expo-constants'
import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import AppText from '@/app/components/text/AppText'

const getJoinWebUrl = () => {
    const isDev = Constants.executionEnvironment === 'storeClient' // Running in Expo Go?

    const BASE_WEB_URL = isDev
        ? 'http://192.168.0.200:8081' // 👈 Use localhost in development
        : 'https://www.splashd.no' // 👈 Use production URL

    return `${BASE_WEB_URL}/join`
}

export default function QrComponent() {
    return (
        <View className="flex-1 items-center justify-between">
            <AppText size="display-sm-regular">Martin's spill</AppText>
            <View className="gap-8 items-center">
                <View className="bg-white p-3 rounded-md">
                    <QRCode
                        value={getJoinWebUrl()}
                        size={200}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
                <AppText>Scan QR med mobilkamera</AppText>
            </View>
            <View className="h-[1px] w-24 bg-accent" />
            <View className="items-center gap-5 pb-10">
                <AppText>Eller skriv inn koden</AppText>
                <AppText size="display-lg-bold" style={{ letterSpacing: 10 }}>
                    12345
                </AppText>
                <AppText>www.splashd.no/join</AppText>
            </View>
        </View>
    )
}
