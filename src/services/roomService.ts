import { Player } from '@/src/types/player'
import {
    PlayerHasRoom,
    PlayerHasRoomCreateDto,
    PlayerHasRoomDeleteDto,
    Room,
    RoomCreateDto,
    RoomUpdateDto,
} from '@/src/types/room'
import { supabase } from '@/src/utils/supabaseClient'

/**
 * Calls the edge function to create a room.
 * @param room
 */
export async function createRoom(room: RoomCreateDto) {
    const { data, error } = await supabase.functions.invoke('room', {
        method: 'POST',
        body: room,
    })

    if (error) {
        throw new Error(error.message)
    }

    return JSON.parse(data) as Room
}

/**
 * Calls the edge function to get a room.
 * @param roomId
 */
export async function getRoom(roomId: number) {
    const { data, error } = await supabase.functions.invoke(`room/${roomId}`, {
        method: 'GET',
    })

    if (error) {
        throw new Error(error.message)
    }

    return JSON.parse(data) as Room
}

/**
 * Calls the edge function to update a room.
 * @param room
 */
export async function updateRoom(room: RoomUpdateDto) {
    const { data, error } = await supabase.functions.invoke('room', {
        method: 'PUT',
        body: room,
    })

    if (error) {
        throw new Error(error.message)
    }

    return JSON.parse(data) as Room
}

/**
 * Calls the edge function to add a player to a room.
 * @param playerHasRoom
 */
export async function addPlayerToRoom(playerHasRoom: PlayerHasRoomCreateDto) {
    const { data, error } = await supabase.functions.invoke('room/player', {
        method: 'POST',
        body: playerHasRoom,
    })

    if (error) {
        throw new Error(error.message)
    }

    return JSON.parse(data) as PlayerHasRoom
}

/**
 * Calls the edge function to delete a player from a room.
 * @param playerHasRoom
 */
export async function deletePlayerFromRoom(
    playerHasRoom: PlayerHasRoomDeleteDto,
) {
    const { error } = await supabase.functions.invoke('room/player', {
        method: 'DELETE',
        body: playerHasRoom,
    })

    if (error) {
        throw new Error(error.message)
    }
}

export async function getPlayersInRoom(roomId: number) {
    const { data, error } = await supabase.functions.invoke(
        `room/players/${roomId}`,
        {
            method: 'GET',
        },
    )

    if (error) {
        throw new Error(error.message)
    }

    return JSON.parse(data) as Player[]
}
