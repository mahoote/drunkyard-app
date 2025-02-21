import { Dispatch } from '@reduxjs/toolkit'
import * as Linking from 'expo-linking'
import { handleDeepLink } from './handleDeepLink'

export const setupDeepLink = async (dispatch: Dispatch) => {
    const initialUrl = await Linking.getInitialURL()
    if (initialUrl) {
        await handleDeepLink({ url: initialUrl }, dispatch)
    }

    // Listen for new deep links
    Linking.addEventListener('url', event => handleDeepLink(event, dispatch))
}
