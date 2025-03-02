import { supabase } from '../utils/supabaseClient'
import { setRoom } from '@/src/redux/slices/gameSlice'
import { AppDispatch } from '@/src/redux/store'
import { getPlayersInRoom } from '@/src/services/roomService'
import { Player } from '@/src/types/player'
import { Room } from '@/src/types/room'

/**
 * Subscribes to changes in the player_has_room table for a specific room.
 * Then fetches all players in that room and sets the players list.
 * @param roomId
 * @param setPlayers
 */
export const subscribeToRoomPlayers = (
    roomId: number,
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
) => {
    const channel = supabase
        .channel(`player-has-room-${roomId}`)
        .on(
            'postgres_changes',
            {
                event: '*', // Listen for INSERT, UPDATE, DELETE
                schema: 'player',
                table: 'player_has_room',
                filter: `room_id=eq.${roomId}`,
            },
            async _ => {
                const updatedPlayers = await getPlayersInRoom(roomId)
                setPlayers(updatedPlayers)
            },
        )
        .subscribe()

    return () => {
        channel.unsubscribe()
    }
}

export const subscribeToRoom = (roomId: number, dispatch: AppDispatch) => {
    const channel = supabase
        .channel(`room-${roomId}`)
        .on(
            'postgres_changes',
            {
                event: '*', // Listen for INSERT, UPDATE, DELETE
                schema: 'player',
                table: 'room',
                filter: `id=eq.${roomId}`,
            },
            async payload => {
                dispatch(setRoom(payload.new as Room))
            },
        )
        .subscribe()

    return () => {
        channel.unsubscribe()
    }
}
