import { Session, User } from '@supabase/supabase-js'
import { Router } from 'expo-router'
import { signOut } from '@/src/redux/actions/authActions'
import { setLoading, setPlayer } from '@/src/redux/slices/authSlice'
import { setRoom } from '@/src/redux/slices/gameSlice'
import { AppDispatch } from '@/src/redux/store'
import { createPlayer, updatePlayer } from '@/src/services/playerService'
import {
    createRoom,
    deletePlayerFromRoom,
    getRoom,
} from '@/src/services/roomService'
import { Player } from '@/src/types/player'
import { Room } from '@/src/types/room'

/**
 * Creates a room, stores it, and navigates to the lobby.
 * Makes sure the user is authenticated before creating room.
 * @param dispatch
 * @param router
 * @param user
 * @param session
 * @param player
 */
export async function handleLobbyCreate(
    dispatch: AppDispatch,
    router: Router,
    user: User | null,
    session: Session | null,
    player: Player | null,
) {
    if (!user || !session) {
        router.navigate('/login')
        return
    }

    if (!player) {
        console.error('Player not found')
        return
    }

    dispatch(
        setLoading({ loading: true, loadingMessage: 'Oppretter lobby...' }),
    )

    const playerUsername = player.username ?? 'Player'
    const roomName = `${playerUsername.substring(0, 12)}'s lobby`

    const room = await createRoom({
        hostPlayerId: player.id,
        name: roomName,
    })
    dispatch(setRoom(room))

    router.navigate('/lobby')
}

/**
 * Handles the back button in the lobby.
 * Sets loading state, deletes the player from the room and redirects to the home page.
 * @param dispatch
 * @param router
 * @param player
 * @param room
 */
export async function handleLobbyBack(
    dispatch: AppDispatch,
    router: Router,
    player: Player,
    room: Room,
) {
    dispatch(setLoading({ loading: true, loadingMessage: 'Forlater rom...' }))
    if (player && room) {
        await deletePlayerFromRoom({
            playerId: player.id,
            roomId: room.id,
        })
        // Delete and "Sign out" guests without account.
        if (player.is_guest) {
            await updatePlayer({
                id: player.id,
                deletedAt: new Date().toISOString(),
            })
            dispatch(signOut(router))
            return
        }
    }

    router.replace('/')
    dispatch(setLoading({ loading: false }))
}

/**
 * Sets the loading state, gets the room id and gets the room.
 * Then, since the player is a guest, create a guest player.
 * Finally redirects to the lobby.
 * @param dispatch
 * @param roomIdString
 * @param router
 * @param username
 * @param code
 */
export async function handleLobbyGuestJoin(
    dispatch: AppDispatch,
    roomIdString: string,
    router: Router,
    username: string,
    code?: string,
) {
    dispatch(setLoading({ loading: true, loadingMessage: 'Joiner spill...' }))

    let roomId: number

    // If the code is a number, use it as the room id.
    if (code && !isNaN(parseInt(code, 10))) {
        roomId = parseInt(code, 10)
    }
    // Else, use the roomIdString as the room id.
    else {
        roomId = parseInt(roomIdString.trim(), 10)
    }

    const room = await getRoom(roomId)
    dispatch(setRoom(room))

    const newPlayer = await createPlayer({ username, isGuest: true })
    dispatch(setPlayer(newPlayer))

    router.replace('/lobby')
}
