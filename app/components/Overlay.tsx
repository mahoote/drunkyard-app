import { FontAwesome } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppView from '@/app/components/views/AppView'

interface OverlayProps {
    isVisible: boolean
    toggleVisibility: () => void
    children: React.ReactNode
}

/**
 * Displays an overlay that covers the entire screen.
 * Fade in and out when the component is shown or hidden.
 * @param isVisible
 * @param toggleVisibility
 * @param children
 * @constructor
 */
const Overlay = ({ isVisible, toggleVisibility, children }: OverlayProps) => {
    const opacity = useSharedValue(0) // Start with invisible state
    const [shouldRender, setShouldRender] = useState(false)

    /**
     * Ensure the component is rendered when it's visible.
     * Animate the opacity when the component is shown or hidden.
     * When the component is hidden, set the shouldRender state to false after the animation completes.
     */
    useEffect(() => {
        if (isVisible) {
            setShouldRender(true)
            opacity.value = withTiming(1, { duration: 300 })
        } else {
            opacity.value = withTiming(0, { duration: 300 }, () => {
                runOnJS(setShouldRender)(false)
            })
        }
    }, [isVisible])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    // Don't render the component when it's not visible
    if (!shouldRender) {
        return null
    }

    return (
        <Animated.View
            style={animatedStyle}
            className="absolute inset-0 bg-background items-center justify-center"
        >
            <AppView isRoot={true} noBackground={true}>
                <AppView className="flex-1">
                    <NavButtons
                        rightButton={<FontAwesome name="close" size={24} />}
                        rightButtonAction={toggleVisibility}
                    />
                    {children}
                </AppView>
            </AppView>
        </Animated.View>
    )
}

export default Overlay
