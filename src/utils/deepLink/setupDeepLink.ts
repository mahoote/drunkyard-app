import * as Linking from 'expo-linking'
import { handleDeepLink } from './handleDeepLink'
import { AppDispatch } from '@/src/redux/store'

export const setupDeepLink = async (dispatch: AppDispatch) => {
    const initialUrl = await Linking.getInitialURL()
    if (initialUrl) {
        await handleDeepLink({ url: initialUrl }, dispatch)
    }

    // Listen for new deep links
    Linking.addEventListener('url', event => handleDeepLink(event, dispatch))
}
