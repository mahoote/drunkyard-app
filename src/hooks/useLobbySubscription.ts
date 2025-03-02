import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    subscribeToRoom,
    subscribeToRoomPlayers,
} from '@/src/realtime/roomRealtime'
import { AppRootState, useAppDispatch } from '@/src/redux/store'
import { Player } from '@/src/types/player'

interface UseLobbySubscriptionProps {
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}

/**
 * Subscribes to changes in the player_has_room and room tables for a specific room.
 * @param setPlayers
 */
export function useLobbySubscription({
    setPlayers,
}: UseLobbySubscriptionProps) {
    const dispatch = useAppDispatch()

    const { room } = useSelector((state: AppRootState) => state.game)

    useEffect(() => {
        if (!room) {
            return
        }

        const unsubscribeToRoomPlayers = subscribeToRoomPlayers(
            room.id,
            setPlayers,
        )
        const unsubscribeToRoom = subscribeToRoom(room.id, dispatch)

        // Cleanup on unmount
        return () => {
            unsubscribeToRoomPlayers()
            unsubscribeToRoom()
        }
    }, [room])
}
