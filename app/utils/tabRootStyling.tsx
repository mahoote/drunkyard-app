import { Platform } from 'react-native'

const tabRootDefaultStyling = 'flex-1 w-full '

export const tabRootStyling = Platform.select({
    ios: `${tabRootDefaultStyling} pt-16`,
    android: `${tabRootDefaultStyling} pt-14`,
    default: `${tabRootDefaultStyling} pt-6`, // Web
})
