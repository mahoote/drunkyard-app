import { Session, User } from '@supabase/supabase-js'
import { Player } from '@/src/types/player'

export interface AuthState {
    user: User | null
    player: Player | null
    session: Session | null
    loading: boolean
    loadingMessage: string
    deepLinkProcessed: boolean
    error: string | null
}

export interface AuthStatus {
    isAuthenticated: boolean
    loading: boolean
    player: Player | null
}
