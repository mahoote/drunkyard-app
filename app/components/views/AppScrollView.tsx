import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import { tabContentStyling } from '@/src/utils/tabRootStyling'

interface AppScrollViewProps extends ScrollViewProps {
    children: React.ReactNode
    className?: string
}

/**
 * A custom ScrollView component that applies content styling.
 * @param children
 * @param className
 * @param props
 * @constructor
 */
export default function AppScrollView({
    children,
    className,
    ...props
}: AppScrollViewProps) {
    return (
        <ScrollView className={`${tabContentStyling} ${className}`} {...props}>
            {children}
        </ScrollView>
    )
}
