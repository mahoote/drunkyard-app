import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'
import NavButtons from '@/app/components/buttons/NavButtons'
import AppView from '@/app/components/views/AppView'

interface OverlayProps {
    isVisible: boolean
    toggleVisibility: () => void
    children: React.ReactNode
}

const Overlay = ({ isVisible, toggleVisibility, children }: OverlayProps) => {
    const opacity = useSharedValue(isVisible ? 1 : 0)

    useEffect(() => {
        opacity.value = withTiming(isVisible ? 1 : 0, { duration: 300 })
    }, [isVisible])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        display: opacity.value === 0 ? 'none' : 'flex',
    }))

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
