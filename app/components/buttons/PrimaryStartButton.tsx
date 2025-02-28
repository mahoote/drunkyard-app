import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppText from '@/app/components/text/AppText'
import BeersIcon from '@/assets/icons/beers.svg'
import SquaresBackgroundImage from '@/assets/images/squares-background-1.svg'
import { setLoading } from '@/src/redux/slices/authSlice'
import { setRoom } from '@/src/redux/slices/gameSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { createRoom } from '@/src/services/roomService'

export default function PrimaryStartButton() {
    const dispatch = useAppDispatch()
    const { player, session, user } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const router = useRouter()

    /**
     * Creates a room, stores it, and navigates to the lobby.
     * Makes sure the user is authenticated before creating room.
     */
    const handlePress = async () => {
        if (!user || !session) {
            router.navigate('/login')
            return
        }

        if (!player) {
            console.error('Player not found')
            return
        }

        dispatch(
            setLoading({ loading: true, loadingMessage: 'Oppretter rom...' }),
        )
        const room = await createRoom({ name: "Martin's room" })
        dispatch(setRoom(room))

        router.navigate('/lobby')
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            className="relative w-full px-3 py-6 bg-secondary-900 flex-row justify-center items-center rounded-3xl overflow-hidden"
            onPress={handlePress}
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
