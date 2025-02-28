import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoader from '@/app/components/AppLoader'
import AppButton from '@/app/components/buttons/AppButton'
import NavButtons from '@/app/components/buttons/NavButtons'
import JoinGameQrComponent from '@/app/components/JoinGameQrComponent'
import Overlay from '@/app/components/Overlay'
import PlayerIcon from '@/app/components/PlayerIcon'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'
import GradientBackgroundView from '@/app/components/views/GradientBackgroundView'
import { subscribeToRoomPlayers } from '@/src/realtime/roomRealtime'
import { setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import {
    addPlayerToRoom,
    deletePlayerFromRoom,
    getPlayersInRoom,
} from '@/src/services/roomService'
import { Player } from '@/src/types/player'

export default function Lobby() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { player, loading } = useSelector((state: AppRootState) => state.auth)
    const { room } = useSelector((state: AppRootState) => state.game)

    const [isOverlayVisible, setOverlayVisible] = useState(false)
    const [players, setPlayers] = useState<Player[]>([])

    const isPlayerAlone = players.length <= 1

    const handleBack = async () => {
        dispatch(
            setLoading({ loading: true, loadingMessage: 'Forlater rom...' }),
        )
        if (player && room) {
            await deletePlayerFromRoom({
                playerId: player.id,
                roomId: room.id,
            })
        }
        router.back()
        dispatch(setLoading({ loading: false }))
    }

    useEffect(() => {
        if (player && room) {
            const addPlayer = async () => {
                await addPlayerToRoom({
                    playerId: player.id,
                    roomId: room.id,
                })
            }
            const fetchPlayers = async () => {
                const playersInRoom = await getPlayersInRoom(room.id)
                setPlayers(playersInRoom)
            }

            addPlayer().then(() =>
                fetchPlayers().then(() =>
                    dispatch(setLoading({ loading: false })),
                ),
            )
        }
    }, [])

    useEffect(() => {
        if (!room) {
            return
        }

        const unsubscribe = subscribeToRoomPlayers(room.id, setPlayers)

        return () => {
            unsubscribe() // Cleanup on unmount
        }
    }, [room])

    if (loading) {
        return <AppLoader />
    }

    return (
        <>
            <AppView isRoot={true} className="items-center justify-between">
                <FlatList
                    className="w-full"
                    contentContainerClassName="pb-10"
                    columnWrapperClassName="justify-center"
                    data={players}
                    numColumns={3}
                    keyExtractor={(_, index) => index.toString()}
                    bounces={false}
                    ListHeaderComponent={
                        <AppView className="items-center">
                            <NavButtons
                                leftButton={
                                    <FontAwesome
                                        name="chevron-left"
                                        size={24}
                                    />
                                }
                                leftButtonAction={handleBack}
                            />
                            <AppText size="display-sm-regular">
                                Martin's spill
                            </AppText>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                className="my-4 items-center"
                                onPress={() => setOverlayVisible(true)}
                            >
                                <FontAwesome
                                    name="qrcode"
                                    size={64}
                                    color="#E8E8EA"
                                />
                                <AppText size="text-sm-regular">
                                    TRYKK PÅ QR
                                </AppText>
                            </TouchableOpacity>
                            <View className="items-center w-full mt-6 mb-4">
                                <AppText size="text-xl-semibold">
                                    {players.length} / 15
                                </AppText>
                            </View>
                        </AppView>
                    }
                    renderItem={({ item: player }) => (
                        <View className="w-1/3 py-2 items-center">
                            <PlayerIcon
                                name={player.username ?? '-'}
                                size="medium"
                            />
                        </View>
                    )}
                    ListFooterComponent={
                        <AppView>
                            {isPlayerAlone && (
                                <AppText
                                    className="text-center mt-10"
                                    size="text-md-regular"
                                    color="text-primary-300"
                                >
                                    Du er alene i rommet.{'\n'}
                                    Trykk på QR-koden for å invitere folk.
                                </AppText>
                            )}
                        </AppView>
                    }
                />
                <GradientBackgroundView
                    gradientBackgroundColor={[3, 3, 35]}
                    defaultHeight={140}
                >
                    <AppView>
                        <AppButton
                            title="NESTE"
                            onPress={() => router.push('/host')}
                        />
                    </AppView>
                </GradientBackgroundView>
            </AppView>
            <Overlay
                isVisible={isOverlayVisible}
                setVisible={setOverlayVisible}
            >
                <JoinGameQrComponent />
            </Overlay>
        </>
    )
}
