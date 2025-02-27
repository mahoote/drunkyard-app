import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'
import { PlayerHasRoom } from '@/src/types/room'

/**
 * Subscribes to changes in the player_has_room table for a specific room.
 * @param roomId
 * @param callback
 */
export const subscribeToRoomPlayers = (
    roomId: number,
    callback: (payload: RealtimePostgresChangesPayload<PlayerHasRoom>) => void,
) => {
    return supabase
        .channel(`room-${roomId}`)
        .on(
            'postgres_changes',
            {
                event: '*', // Listen for INSERT, UPDATE, DELETE
                schema: 'player',
                table: 'player_has_room',
                filter: `room_id=eq.${roomId}`,
            },
            callback,
        )
        .subscribe()
}
