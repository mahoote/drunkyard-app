import {
    Poppins_400Regular,
    Poppins_300Light_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/AppText'
import StartGameButton from '@/app/components/StartGameButton'

export default function Index() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_300Light_Italic,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    })

    if (!fontsLoaded) {
        return (
            <View>
                <AppText>Loading...</AppText>
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-start w-full px-8">
            <AppText size="display-md-bold">SPLASHD</AppText>
            <StartGameButton />
        </View>
    )
}
