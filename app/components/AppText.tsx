import React from 'react'
import { Text, TextProps } from 'react-native'

interface AppTextProps extends TextProps {
    children: React.ReactNode
    size?: string
    color?: string
    className?: string
}

export default function AppText({
    children,
    size = 'text-xl-regular',
    color = 'text-foreground',
    className,
    ...props
}: AppTextProps) {
    return (
        <Text className={`${color} ${size} ${className}`} {...props}>
            {children}
        </Text>
    )
}
