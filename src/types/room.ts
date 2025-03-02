export interface Room {
    id: number
    name: string
    max_players?: number
    created_at: string
    deleted_at?: string
    host_player_id: string
}

export interface PlayerHasRoom {
    id: number
    is_host: boolean
    created_at: string
    room_id: number
    player_id: string
}

export interface RoomCreateDto {
    hostPlayerId: string
    name: string
    maxPlayers?: number
}

export interface RoomUpdateDto {
    id: number
    name?: string
    maxPlayers?: number
    deletedAt?: string
}

export interface PlayerHasRoomCreateDto {
    playerId: string
    roomId: number
    isHost?: boolean
}

export interface PlayerHasRoomDeleteDto {
    playerId: string
    roomId: number
}
