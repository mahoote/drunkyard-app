import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key are required!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth:
        Platform.OS === 'web'
            ? {}
            : {
                  storage: AsyncStorage,
                  autoRefreshToken: true,
                  persistSession: true,
                  detectSessionInUrl: false,
              },
})
