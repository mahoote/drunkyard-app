import { act, renderHook } from '@testing-library/react'
import { useEmailRetry } from '@/src/hooks/useEmailRetry'

describe('useEmailRetry', () => {
    it('should set email sent to true', async () => {
        // Arrange
        const props = {
            loading: true,
            emailSent: false,
            setEmailSent: jest.fn(),
            secondsToRetry: 0,
            setSecondsToRetry: jest.fn(),
            canRetry: false,
            setCanRetry: jest.fn(),
        }

        // Act
        await act(async () => {
            renderHook(() => useEmailRetry(props))
        })

        // Assert
        expect(props.setEmailSent).toHaveBeenCalledWith(true)
    })

    /**
     * Test to verify that the countdown updates the `secondsToRetry` state correctly.
     * It mocks the `setSecondsToRetry` function to handle function arguments,
     * advances the timers by 3 seconds, and asserts that the function is called
     * three times with the correct arguments and that the final `secondsToRetry` value is 0.
     */
    it('should do a countdown and update seconds to retry', () => {
        // Arrange
        jest.useFakeTimers()
        const props = {
            loading: false,
            emailSent: true,
            setEmailSent: jest.fn(),
            secondsToRetry: 3,
            setSecondsToRetry: jest.fn(),
            canRetry: false,
            setCanRetry: jest.fn(),
        }

        // Mock the setSecondsToRetry function to handle function arguments
        props.setSecondsToRetry.mockImplementation(arg => {
            if (typeof arg === 'function') {
                props.secondsToRetry = arg(props.secondsToRetry)
            } else {
                props.secondsToRetry = arg
            }
        })

        // Act
        act(() => {
            renderHook(() => useEmailRetry(props))
        })

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(3000) // 3 seconds
        })

        // Assert
        expect(props.setSecondsToRetry).toHaveBeenCalledTimes(3)
        for (let i = 1; i <= 3; i++) {
            expect(props.setSecondsToRetry).toHaveBeenNthCalledWith(
                i,
                expect.any(Function),
            )
        }
        expect(props.secondsToRetry).toBe(0)
        jest.useRealTimers()
    })

    it('should set can retry to true so the user can retry', () => {
        // Arrange
        const props = {
            loading: false,
            emailSent: true,
            setEmailSent: jest.fn(),
            secondsToRetry: 0,
            setSecondsToRetry: jest.fn(),
            canRetry: false,
            setCanRetry: jest.fn(),
        }

        // Act
        renderHook(() => useEmailRetry(props))

        // Assert
        expect(props.setCanRetry).toHaveBeenCalledWith(true)
    })
})
