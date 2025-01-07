import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import Svg, { G, Ellipse, Circle } from 'react-native-svg'

interface BackgroundSvgProps {
    children?: React.ReactNode
    backgroundColor?: string
    circleColor?: string
}

const BackgroundCircles: React.FC<BackgroundSvgProps> = ({
    children,
    backgroundColor = 'bg-background',
    circleColor = 'white',
}) => {
    return (
        <View className={`flex-1 w-full h-full relative ${backgroundColor}`}>
            <StatusBar style="auto" />
            <Svg
                width="100%"
                height="100%"
                viewBox="0 0 393 852"
                fill="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            >
                <G>
                    <Ellipse
                        cx="69.5"
                        cy="302.5"
                        rx="257.5"
                        ry="195.5"
                        fill={circleColor}
                        fillOpacity="0.02"
                    />
                    <Circle
                        cx="41"
                        cy="684"
                        r="95"
                        fill={circleColor}
                        fillOpacity="0.02"
                    />
                    <Circle
                        cx="349"
                        cy="81"
                        r="95"
                        fill={circleColor}
                        fillOpacity="0.02"
                    />
                    <Circle
                        cx="156"
                        cy="16"
                        r="47"
                        fill={circleColor}
                        fillOpacity="0.02"
                    />
                </G>
            </Svg>
            <View className="flex-1 z-10">{children}</View>
        </View>
    )
}

export default BackgroundCircles
