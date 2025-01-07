import {
    Poppins_400Regular,
    Poppins_300Light_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import React from 'react'
import { FlatList, View } from 'react-native'
import AppText from '@/app/components/AppText'
import PrimaryStartButton from '@/app/components/PrimaryStartButton'
import SecondaryStartButton from '@/app/components/SecondaryStartButton'
import CheersHandsIcon from '@/assets/icons/cheers-hands.svg'
import HoldingBeersIcon from '@/assets/icons/holding-beer.svg'

const data = [
    {
        id: '1',
        title: 'Bli kjent',
        icon: <HoldingBeersIcon width={62} height={82} />,
    },
    {
        id: '2',
        title: 'Venner',
        icon: <CheersHandsIcon width={76} height={82} />,
    },
]

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

    const renderItem = ({
        item,
    }: {
        item: { id: string; title: string; icon: React.ReactNode }
    }) => (
        <View className="flex-1">
            <SecondaryStartButton {...item} />
        </View>
    )

    return (
        <View className="flex-1 w-full items-center">
            <View className="flex-1 top-20 items-center w-full px-6 max-w-[30rem]">
                <AppText size="display-lg-bold" className="my-12">
                    SPLASHD
                </AppText>
                <View className="w-full">
                    <PrimaryStartButton />

                    <View className="mt-6 gap-3">
                        <AppText size="text-xl-regular">
                            Spill for anledningen
                        </AppText>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ gap: 12 }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
