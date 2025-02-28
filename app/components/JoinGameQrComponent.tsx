import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useSelector } from 'react-redux'
import AppText from '@/app/components/text/AppText'
import { AppRootState } from '@/src/redux/store'

interface JoinGameQrProps {
    roomId: number
}

export default function JoinGameQrComponent({ roomId }: JoinGameQrProps) {
    const appBaseUrl = useSelector(
        (state: AppRootState) => state.webUrl.appBaseUrl,
    )
    // const joinUrl = `http://${appBaseUrl}/join`
    const joinUrlBase = `exp://${appBaseUrl}/--/join`
    const joinUrl = `${joinUrlBase}?code=${roomId}`

    return (
        <View className="flex-1 items-center justify-between">
            <AppText size="display-sm-regular">Martin's spill</AppText>
            <View className="gap-8 items-center">
                <View className="bg-white p-3 rounded-md">
                    <QRCode
                        value={joinUrl}
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
                <AppText size="display-lg-bold">{roomId}</AppText>
                <AppText>{joinUrlBase}</AppText>
            </View>
        </View>
    )
}
