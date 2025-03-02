import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setLoading } from '@/src/redux/slices/authSlice'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { addPlayerToRoom, getPlayersInRoom } from '@/src/services/roomService'
import { Player } from '@/src/types/player'

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
