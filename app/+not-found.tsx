import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/text/AppText'

export default function NotFound() {
    return (
        <View className="flex-1 justify-center items-center">
            <AppText>404 - Page Not Found</AppText>
            <Link href="/">
                <AppText className="underline">Go to start</AppText>
            </Link>
        </View>
    )
}
