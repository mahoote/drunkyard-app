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
import EditableText from '@/app/components/text/EditableText'
import AppView from '@/app/components/views/AppView'
import GradientBackgroundView from '@/app/components/views/GradientBackgroundView'
import {
    subscribeToRoom,
    subscribeToRoomPlayers,
} from '@/src/realtime/roomRealtime'
import { signOut } from '@/src/redux/actions/authActions'
import { setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { updatePlayer } from '@/src/services/playerService'
import {
    addPlayerToRoom,
    deletePlayerFromRoom,
    getPlayersInRoom,
    updateRoom,
} from '@/src/services/roomService'
import { Player } from '@/src/types/player'
import { handleLobbyBack } from '@/src/utils/lobbyUtils'
import { useAddPlayerToRoom } from '@/src/hooks/useAddPlayerToRoom'
import { useLobbySubscription } from '@/src/hooks/useLobbySubscription'

export default function Lobby() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { player, loading } = useSelector((state: AppRootState) => state.auth)
    const { room } = useSelector((state: AppRootState) => state.game)

    const [isOverlayVisible, setOverlayVisible] = useState(false)
    const [players, setPlayers] = useState<Player[]>([])

    const isPlayerAlone = players.length <= 1

    useAddPlayerToRoom({ setPlayers })

    useLobbySubscription({ setPlayers })

    if (loading) {
        return <AppLoader />
    }

    if (!room || !player) {
        return (
            <AppView className="flex-1 items-center justify-center">
                <AppText>Det var et problem med å hente lobby data.</AppText>
            </AppView>
        )
    }

    const isHost = player.id === room.host_player_id

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
                                leftButtonAction={async () =>
                                    await handleLobbyBack(
                                        dispatch,
                                        router,
                                        player,
                                        room,
                                    )
                                }
                            />
                            {isHost ? (
                                <EditableText
                                    size="display-sm-regular"
                                    maxLength={20}
                                    onSave={newName =>
                                        updateRoom({
                                            id: room.id,
                                            name: newName,
                                        })
                                    }
                                >
                                    {room.name}
                                </EditableText>
                            ) : (
                                <AppText size="display-sm-regular">
                                    {room.name}
                                </AppText>
                            )}
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
                                showAsHost={player.id === room.host_player_id}
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
                {isHost && (
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
                )}
            </AppView>
            <Overlay
                isVisible={isOverlayVisible}
                setVisible={setOverlayVisible}
            >
                <JoinGameQrComponent roomId={room.id} />
            </Overlay>
        </>
    )
}
