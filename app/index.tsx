import { FontAwesome } from '@expo/vector-icons'
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
import { useSelector } from 'react-redux'
import NavButtons from '@/app/components/buttons/NavButtons'
import PrimaryStartButton from '@/app/components/buttons/PrimaryStartButton'
import SecondaryStartButton from '@/app/components/buttons/SecondaryStartButton'
import ProfileIcon from '@/app/components/ProfileIcon'
import AppText from '@/app/components/text/AppText'
import AppScrollView from '@/app/components/views/AppScrollView'
import AppView from '@/app/components/views/AppView'
import CheersHandsIcon from '@/assets/icons/cheers-hands.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import HoldingBeersIcon from '@/assets/icons/holding-beer.svg'
import AppLogo from '@/assets/logos/app-logo.svg'
import { AppRootState } from '@/src/redux/store'

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

    const { user, loading: authLoading } = useSelector(
        (state: AppRootState) => state.auth,
    )

    if (!fontsLoaded || authLoading) {
        return (
            <AppView className="flex-1 items-center justify-center">
                <AppText>Loading...</AppText>
            </AppView>
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

    const rightButton = () => {
        if (!user) {
            return (
                <AppText>
                    <FontAwesome name="user-circle" size={36} />
                </AppText>
            )
        }

        return <ProfileIcon name="Martin" />
    }

    return (
        <AppView isRoot={true} className="items-center">
            <AppScrollView
                bounces={false}
                contentContainerClassName="items-center"
            >
                <NavButtons
                    leftButton={<FeedbackIcon width={36} height={36} />}
                    rightButton={rightButton()}
                    leftButtonHref="/join"
                    rightButtonHref="/profile"
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
            </AppScrollView>
        </AppView>
    )
}
