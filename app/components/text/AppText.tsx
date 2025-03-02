import React from 'react'
import { Text, TextProps } from 'react-native'

export interface AppTextProps extends TextProps {
    children: React.ReactNode
    size?: string
    color?: string
    className?: string
    verticalAlign?: boolean
}

/**
 * AppText is a component that displays text with a specific size and color.
 * It also has an optional verticalAlign prop that adjusts the text's vertical alignment on Android.
 * - Default size: text-xl-regular
 * - Default color: text-foreground
 * @param children
 * @param size
 * @param color
 * @param className
 * @param verticalAlign
 * @param props
 * @constructor
 */
export default function AppText({
    children,
    size = 'text-xl-regular',
    color = 'text-foreground',
    className,
    verticalAlign = false,
    ...props
}: AppTextProps) {
    const androidVerticalAlign = verticalAlign ? 'android:translate-y-0.5' : ''

    return (
        <Text
            className={`${color} ${size} ${androidVerticalAlign} ${className}`}
            {...props}
        >
            {children}
        </Text>
    )
}
