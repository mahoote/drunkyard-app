import { Platform } from 'react-native'

/**
 * Function to check if instance is on web.
 */
export function isWeb(): boolean {
    return Platform.OS === 'web'
}

/**
 * Function to check if instance is an app.
 */
export function isDevice(): boolean {
    return Platform.OS !== 'web'
}
