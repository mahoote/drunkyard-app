import {
    Poppins_400Regular,
    Poppins_300Light_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import React from 'react'
import { Text, View } from 'react-native'

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
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-start w-full px-8">
            <Text className="text-foreground display-md-regular">
                Dette er en test
            </Text>
            <Text className="text-foreground display-md-light-italic">
                Dette er en test
            </Text>
            <Text className="text-foreground display-md-medium">
                Dette er en test
            </Text>
            <Text className="text-foreground display-md-semibold">
                Dette er en test
            </Text>
            <Text className="text-foreground display-md-bold">
                Dette er en test
            </Text>
            <Text className="text-foreground display-md-bold">
                SETT I GANG!
            </Text>
            <Text className="text-foreground text-xl-regular">
                Spill for anledningen
            </Text>
            <Text className="text-foreground text-xl-light-italic">
                Spill for anledningen
            </Text>
            <View className="flex-row gap-4 justify-center items-center w-full">
                <Text className="text-foreground display-xs-bold">
                    Bli kjent
                </Text>
                <Text className="text-foreground display-xs-bold">Venner</Text>
            </View>
        </View>
    )
}
