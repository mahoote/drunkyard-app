import { Session, User } from '@supabase/supabase-js'
import { Router } from 'expo-router'
import React, { useEffect } from 'react'
import { setLoading } from '@/src/redux/slices/authSlice'
import { setRoom } from '@/src/redux/slices/gameSlice'
import { AppDispatch } from '@/src/redux/store'
import { getRoom } from '@/src/services/roomService'
import { Player } from '@/src/types/player'

interface UseJoinLobbyProps {
    setRoomIdString: React.Dispatch<React.SetStateAction<string>>
    dispatch: AppDispatch
    router: Router
    user: User | null
    session: Session | null
    player: Player | null
    code?: string
}

/**
 * Handles the player joining the lobby.
 * Sets the room id, gets the room and redirects to the lobby.
 * @param setRoomIdString
 * @param dispatch
 * @param router
 * @param code
 * @param user
 * @param session
 * @param player
 */
export function usePlayerJoinLobby({
    setRoomIdString,
    dispatch,
    router,
    code,
    user,
    session,
    player,
}: UseJoinLobbyProps) {
    useEffect(() => {
        if (!code) {
            return
        }

        setRoomIdString(code)

        if (user && session && player) {
            const handleLobbyJoin = async () => {
                dispatch(
                    setLoading({
                        loading: true,
                        loadingMessage: 'Joiner spill...',
                    }),
                )

                const roomId = parseInt(code, 10)

                const room = await getRoom(roomId)
                dispatch(setRoom(room))

                router.replace('/lobby')
            }

            handleLobbyJoin()
        }
    }, [user, session, player, code])
}
