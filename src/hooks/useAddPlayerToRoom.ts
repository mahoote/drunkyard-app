import React, { useEffect } from 'react'
import { addPlayerToRoom, getPlayersInRoom } from '@/src/services/roomService'
import { setLoading } from '@/src/redux/slices/authSlice'
import { Player } from '@/src/types/player'
import { Room } from '@/src/types/room'
import { AppDispatch, AppRootState, useAppDispatch } from '@/src/redux/store'
import { useSelector } from 'react-redux'

interface UseAddPlayerToRoomProps {
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}

/**
 * On mount, adds the player to the room and fetches all players in the room.
 * @param player
 * @param setPlayers
 */
export function useAddPlayerToRoom({ setPlayers }: UseAddPlayerToRoomProps) {
    const dispatch = useAppDispatch()

    const { player } = useSelector((state: AppRootState) => state.auth)
    const { room } = useSelector((state: AppRootState) => state.game)

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
}
