import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { LayoutChangeEvent, Platform, Pressable } from 'react-native'
import AppText from '@/app/components/AppText'
import AppView from '@/app/components/views/AppView'

interface AppButtonProps {
    title: string
    size?: 'small' | 'large'
    fullWidth?: boolean
    gradientBackgroundColor?: [number, number, number]
}

/**
 * Displays a custom button with a title.
 * Two different sizes are available: small and large.
 * @param title
 * @param size
 * @param fullWidth
 * @param gradientBackgroundColor
 * @constructor
 */
export default function AppButton({
    title,
    size = 'large',
    fullWidth = true,
    gradientBackgroundColor,
}: AppButtonProps) {
    const [gradientHeight, setGradientHeight] = useState<number>(0)

    const width = fullWidth ? 'w-full' : 'w-fit'

    let buttonStyles = 'rounded-xl p-1 ios:p-2'
    let textSize = 'text-xl-semibold'

    if (size === 'large') {
        buttonStyles = 'rounded-2xl p-2 ios:p-3'
        textSize = 'display-sm-semibold'
    }

    const handlePressableLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout
        const osHeight = Platform.OS === 'ios' ? 100 : 70

        setGradientHeight(height + osHeight)
    }

    return (
        <AppView>
            {gradientBackgroundColor && (
                <LinearGradient
                    colors={[
                        `rgba(${gradientBackgroundColor[0]}, ${gradientBackgroundColor[1]}, ${gradientBackgroundColor[2]}, 0)`,
                        `rgba(${gradientBackgroundColor[0]}, ${gradientBackgroundColor[1]}, ${gradientBackgroundColor[2]}, 1)`,
                    ]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.6 }} // Transition from transparent to color starts at 60% of the height
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: gradientHeight,
                    }}
                    pointerEvents="none" // Ensures it doesn't block interaction
                />
            )}
            <Pressable
                className={`${buttonStyles} ${width} justify-center bg-secondary-900`}
                onLayout={handlePressableLayout}
            >
                <AppText
                    size={textSize}
                    className="text-center"
                    verticalAlign={true}
                >
                    {title}
                </AppText>
            </Pressable>
        </AppView>
    )
}
