import * as Linking from 'expo-linking'
import deepLinkMockData from '@/src/__mocks__/deepLinkMockData'
import { handleDeepLink } from '@/src/utils/deepLink/handleDeepLink'
import { setupDeepLink } from '@/src/utils/deepLink/setupDeepLink'

const mockDispatch = jest.fn()

jest.mock('@/src/utils/deepLink/handleDeepLink', () => ({
    handleDeepLink: jest.fn(),
}))

describe('setupDeepLinking', () => {
    /**
     * The setupDeepLink function should handle the initial URL if it is present.
     * It should call handleDeepLink with the initial URL and the dispatch function.
     */
    it('should handle initial URL if present', async () => {
        // Arrange
        const { access_token, refresh_token } = deepLinkMockData()
        const initialUrl = `myapp://auth?access_token=${access_token}&refresh_token=${refresh_token}`

        jest.spyOn(Linking, 'getInitialURL').mockResolvedValue(initialUrl)

        // Act
        await setupDeepLink(mockDispatch)

        // Assert
        expect(Linking.getInitialURL).toHaveBeenCalled()
        expect(handleDeepLink).toHaveBeenCalledWith(
            { url: initialUrl },
            mockDispatch,
        )
    })

    /**
     * The setupDeepLink function should add an event listener for new deep links.
     * It should call handleDeepLink with the event and the dispatch function when a deep link event is received.
     */
    it('should add an event listener for new deep links', async () => {
        // Arrange
        const mockAddEventListener = jest.spyOn(Linking, 'addEventListener')

        // Act
        await setupDeepLink(mockDispatch)

        // Assert
        expect(mockAddEventListener).toHaveBeenCalledWith(
            'url',
            expect.any(Function),
        )
    })

    /**
     * The setupDeepLink function should call handleDeepLink when a deep link event is received.
     */
    it('should call handleDeepLink when a deep link event is received', async () => {
        // Arrange
        const deepLinkEvent = { url: 'myapp://auth?token=123' }
        const mockAddEventListener = jest.spyOn(Linking, 'addEventListener')

        let capturedCallback: (event: { url: string }) => void = () => {}
        // @ts-ignore
        mockAddEventListener.mockImplementation((_, callback) => {
            capturedCallback = callback // Store the callback function
            return {
                remove: jest.fn(),
            }
        })

        // Act
        await setupDeepLink(mockDispatch)

        // Simulate a deep link event and manually call the stored callback
        capturedCallback(deepLinkEvent)

        // Assert
        expect(handleDeepLink).toHaveBeenCalledWith(deepLinkEvent, mockDispatch)
    })
})
