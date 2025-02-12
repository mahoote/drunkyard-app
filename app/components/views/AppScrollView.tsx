import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import { tabContentStyling, tabRootStyling } from '@/src/utils/tabRootStyling'

interface AppScrollViewProps extends ScrollViewProps {
    children: React.ReactNode
    className?: string
    isRoot?: boolean
    isContent?: boolean
}

/**
 * A custom ScrollView component that applies styling based on the isRoot and isContent props.
 * @param children
 * @param className
 * @param isContent
 * @param isRoot
 * @param props
 * @constructor
 */
export default function AppScrollView({
    children,
    className,
    isContent = true,
    isRoot,
    ...props
}: AppScrollViewProps) {
    if (isRoot) {
        return (
            <ScrollView className={`${tabRootStyling} ${className}`} {...props}>
                {children}
            </ScrollView>
        )
    }
    if (isContent) {
        return (
            <ScrollView
                className={`${tabContentStyling} ${className} max-w-lg`}
                {...props}
            >
                {children}
            </ScrollView>
        )
    }

    return (
        <ScrollView className={className} {...props}>
            {children}
        </ScrollView>
    )
}
