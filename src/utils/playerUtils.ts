import { PlayerUpdateDto } from '@/src/types/player'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Calls the edge function to update a player.
 * @param playerUpdateDto
 */
export async function updatePlayer(playerUpdateDto: PlayerUpdateDto) {
    const { data, error } = await supabase.functions.invoke('player', {
        method: 'PUT',
        body: playerUpdateDto,
    })

    if (error) {
        throw new Error(error.message || 'Failed to update player')
    }

    return data
}
