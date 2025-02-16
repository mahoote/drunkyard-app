import { Session, User } from '@supabase/supabase-js'

/**
 * Mock data for a working deep link.
 */
export default function deepLinkMockData() {
    const access_token = 'valid_access_token'
    const refresh_token = 'valid_refresh_token'

    const user: User = {
        id: 'user_id',
        app_metadata: {},
        user_metadata: {},
        aud: '',
        created_at: '',
    }

    const session: Session = {
        user,
        access_token,
        refresh_token,
        expires_in: 3600,
        token_type: '',
    }

    return { access_token, refresh_token, user, session }
}
