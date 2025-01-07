import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function NotFound() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-foreground text-xl-regular">
                404 - Page Not Found
            </Text>
            <Link href="/">
                <Text className="text-foreground text-xl-regular underline">
                    Go to start
                </Text>
            </Link>
        </View>
    )
}
