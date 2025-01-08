import React from 'react'
import { View } from 'react-native'
import CirclesBackgroundImage from '@/assets/images/circles-background-1.svg'

interface BackgroundSvgProps {
    children?: React.ReactNode
    backgroundColor?: string
    circleColor?: string
    className?: string
}

const BackgroundCircles: React.FC<BackgroundSvgProps> = ({
    children,
    backgroundColor = 'bg-background',
    circleColor = 'white',
    className,
}) => {
    return (
        <View
            className={`flex-1 w-full h-full relative overflow-hidden ${backgroundColor} ${className}`}
        >
            <View className="absolute inset-0">
                <CirclesBackgroundImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    color={circleColor}
                />
            </View>
            <View className="flex-1 z-10">{children}</View>
        </View>
    )
}

export default BackgroundCircles
