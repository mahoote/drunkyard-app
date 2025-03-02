import { Router } from 'expo-router'
import { signOut } from '@/src/redux/actions/authActions'
import { setLoading } from '@/src/redux/slices/authSlice'
import { AppDispatch } from '@/src/redux/store'
import { updatePlayer } from '@/src/services/playerService'
import { deletePlayerFromRoom } from '@/src/services/roomService'
import { Player } from '@/src/types/player'
import { Room } from '@/src/types/room'

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
