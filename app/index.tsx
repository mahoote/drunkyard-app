import {
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import React from 'react'
import { Text, View } from 'react-native'

export default function Index() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-center">
            <View className="gap-4 justify-center items-center">
                <Text className="text-foreground text-2xl">This is my app</Text>
                <Text className="text-foreground text-5xl font-extrabold">
                    SETT I GANG!
                </Text>
            </View>
        </View>
    )
}
