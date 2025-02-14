import { Session, User } from '@supabase/supabase-js'

export interface AuthState {
    user: User | null
    session: Session | null
    loading: boolean
    deepLinkProcessed: boolean
    error: string | null
}

export interface AuthStatus {
    isAuthenticated: boolean
    loading: boolean
}
