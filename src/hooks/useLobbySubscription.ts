import React, { useEffect } from 'react'
import {
    subscribeToRoom,
    subscribeToRoomPlayers,
} from '@/src/realtime/roomRealtime'
import { Room } from '@/src/types/room'
import { Player } from '@/src/types/player'
import { AppDispatch, AppRootState, useAppDispatch } from '@/src/redux/store'
import { useSelector } from 'react-redux'

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
