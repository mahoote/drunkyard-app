import { Session, User } from '@supabase/supabase-js'

export const jestMockAuth = () =>
    jest.mock('@/src/redux/slices/authSlice', () => {
        return {
            setUser: jest.fn((user: User) => ({
                type: 'auth/setUser',
                payload: user,
            })),
            setSession: jest.fn((session: Session) => ({
                type: 'auth/setSession',
                payload: session,
            })),
            setLoading: jest.fn((loading: boolean) => ({
                type: 'auth/setLoading',
                payload: loading,
            })),
            setError: jest.fn((error: string) => ({
                type: 'auth/setError',
                payload: error,
            })),
        }
    })
