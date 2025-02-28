import { useGlobalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoader from '@/app/components/AppLoader'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppText from '@/app/components/text/AppText'
import AppTextInput from '@/app/components/text/AppTextInput'
import AppView from '@/app/components/views/AppView'
import { setLoading, setPlayer } from '@/src/redux/slices/authSlice'
import { setRoom } from '@/src/redux/slices/gameSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { createPlayer } from '@/src/services/playerService'
import { getRoom } from '@/src/services/roomService'
import { isDevice } from '@/src/utils/platformUtils'

export default function Join() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { code } = useGlobalSearchParams<{ code: string }>()

    const appBaseUrl = useSelector(
        (state: AppRootState) => state.webUrl.appBaseUrl,
    )

    const { user, session, loading } = useSelector(
        (state: AppRootState) => state.auth,
    )
    const { player } = useSelector((state: AppRootState) => state.auth)

    const [username, setUsername] = useState<string>('')
    const [roomIdString, setRoomIdString] = useState<string>('')

    const loginUrl = `exp://${appBaseUrl}/--/login`

    /**
     * Fetches the room and navigates to the lobby.
     * @param code
     */
    const handleJoinLobby = async (code?: string) => {
        dispatch(
            setLoading({ loading: true, loadingMessage: 'Joiner spill...' }),
        )

        let roomId: number

        if (code && !isNaN(parseInt(code))) {
            roomId = parseInt(code)
        } else {
            roomId = parseInt(roomIdString.trim() ?? code)
        }

        const room = await getRoom(roomId)
        dispatch(setRoom(room))

        if (!player) {
            const newPlayer = await createPlayer({ username, isGuest: true })
            dispatch(setPlayer(newPlayer))
        }

        router.replace('/lobby')
    }

    useEffect(() => {
        if (code) {
            setRoomIdString(code)
        }

        if (user && session && code) {
            handleJoinLobby(code)
        }
    }, [user, session, code])

    if (loading) {
        return <AppLoader />
    }

    return (
        <AppView isRoot={true} className="items-center">
            <AppView className="flex-1 items-center px-10">
                <NavButtons />
                <AppText size="display-sm-regular">Bli med i spill</AppText>
                <View className="w-full flex-1 justify-between mt-20 pb-10">
                    <View className="gap-4">
                        <View className="items-center gap-2">
                            <AppText>Spill som gjest</AppText>
                            <AppTextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Skriv inn navn"
                                hasButton={true}
                                buttonAction={handleJoinLobby}
                                maxLength={16}
                                width="w-72"
                            />
                        </View>
                        <View className="items-center gap-2">
                            <AppText>Kode</AppText>
                            <AppTextInput
                                value={roomIdString}
                                onChangeText={setRoomIdString}
                                className="text-lg-semibold text-center"
                                keyboardType="number-pad"
                                placeholder="-"
                                width="w-40"
                                maxLength={6}
                            />
                        </View>
                    </View>
                    <View className="gap-10">
                        <View className="gap-2">
                            <AppText className="text-center">Bruker?</AppText>
                            <AppText
                                className="text-center"
                                size="text-md-regular"
                            >
                                Ønsker du å beholde premier og lagre prosessen
                                din, kan du{' '}
                                <AppText size="text-md-semibold">
                                    logge inn i appen!
                                </AppText>
                            </AppText>
                        </View>
                        <AppButton
                            title="Logg inn"
                            size="small"
                            color="primary-400"
                            onPress={() => {
                                if (isDevice()) {
                                    router.push('/login')
                                } else {
                                    window.location.href = loginUrl
                                }
                            }}
                        />
                    </View>
                </View>
            </AppView>
        </AppView>
    )
}
