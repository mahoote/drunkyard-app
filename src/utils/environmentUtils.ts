const NODE_ENV = process.env.EXPO_PUBLIC_NODE_ENV || process.env.NODE_ENV

/**
 * Checks if the NODE_ENV is equal to 'production'.
 */
export const isProduction = (): boolean => {
    return NODE_ENV === 'production'
}
