import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'
import AppView from '@/app/components/AppView'
import NavButtons from '@/app/components/NavButtons'
import { tabRootStyling } from '@/app/utils/tabRootStyling'

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
            className={`${tabRootStyling} absolute inset-0 bg-background items-center justify-center`}
        >
            <AppView className="flex-1">
                <NavButtons
                    rightButton={<FontAwesome name="close" size={24} />}
                    rightButtonAction={toggleVisibility}
                />

                {children}
            </AppView>
        </Animated.View>
    )
}

export default Overlay
