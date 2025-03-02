import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppText from '@/app/components/text/AppText'
import BeersIcon from '@/assets/icons/beers.svg'
import SquaresBackgroundImage from '@/assets/images/squares-background-1.svg'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { handleLobbyCreate } from '@/src/utils/lobbyUtils'

export default function PrimaryStartButton() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { player, session, user } = useSelector(
        (state: AppRootState) => state.auth,
    )

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            className="relative w-full px-3 py-6 bg-secondary-900 flex-row justify-center items-center rounded-3xl overflow-hidden"
            onPress={async () =>
                handleLobbyCreate(dispatch, router, user, session, player)
            }
        >
            <View className="absolute inset-0">
                <SquaresBackgroundImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    color="#F0F1FD"
                />
            </View>
            <View className="w-full flex-row justify-evenly items-center">
                <AppText
                    size="display-md-bold"
                    className="max-w-40 text-center"
                >
                    SETT I GANG!
                </AppText>
                <BeersIcon height={115} fill="blue" />
            </View>
        </TouchableOpacity>
    )
}
