import { Player, PlayerCreateDto, PlayerUpdateDto } from '@/src/types/player'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Calls the edge function to create a player.
 * @param playerDto
 */
export async function createPlayer(playerDto: PlayerCreateDto) {
    const { data, error } = await supabase.functions.invoke('player', {
        method: 'POST',
        body: playerDto,
    })

    if (error) {
        throw new Error(error.message || 'Failed to create player')
    }

    return JSON.parse(data) as Player
}

/**
 * Calls the edge function to get a player.
 * @param user_id
 */
export async function getPlayer(user_id: string) {
    const { data, error } = await supabase.functions.invoke(
        `player?user_id=${user_id}`,
        {
            method: 'GET',
        },
    )

    if (error) {
        throw new Error(error.message || 'Failed to get player')
    }

    return JSON.parse(data) as Player
}

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

    return JSON.parse(data) as Player
}
