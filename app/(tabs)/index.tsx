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
import NavButtons from '@/app/components/NavButtons'
import PrimaryStartButton from '@/app/components/PrimaryStartButton'
import ProfileIcon from '@/app/components/ProfileIcon'
import SecondaryStartButton from '@/app/components/SecondaryStartButton'
import CheersHandsIcon from '@/assets/icons/cheers-hands.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import HoldingBeersIcon from '@/assets/icons/holding-beer.svg'
import AppLogo from '@/assets/logos/app-logo.svg'

const data = [
    {
        id: '1',
        title: 'Bli kjent',
        icon: <HoldingBeersIcon height={82} style={{ zIndex: 1 }} />,
    },
    {
        id: '2',
        title: 'Venner',
        icon: <CheersHandsIcon height={82} style={{ zIndex: 1 }} />,
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
        <View className="flex-1 relative">
            <SecondaryStartButton {...item} />
        </View>
    )

    return (
        <View className="flex-1 w-full items-center">
            <View className="flex-1 items-center w-full px-6 max-w-lg">
                <NavButtons
                    leftButton={<FeedbackIcon width={36} height={36} />}
                    rightButton={<ProfileIcon name="Martin" />}
                />
                <View className="mt-8 mb-12">
                    <AppLogo height={70} width={240} />
                </View>
                <View className="w-full gap-8">
                    <PrimaryStartButton />

                    <View className="gap-3">
                        <AppText size="text-xl-regular">
                            Spill for anledningen
                        </AppText>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ gap: 12 }}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
