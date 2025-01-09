import { Platform } from 'react-native'

const tabRootDefaultStyling = 'flex-1'

export const tabRootStyling = Platform.select({
    ios: `${tabRootDefaultStyling} pt-16`,
    android: `${tabRootDefaultStyling} pt-12`,
    default: `${tabRootDefaultStyling} pt-6`, // Web
})
