import React from 'react'
import { View, ViewProps } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'
import { tabContentStyling, tabRootStyling } from '@/src/utils/tabRootStyling'

interface AppViewProps extends ViewProps {
    children: React.ReactNode
    className?: string
    isRoot?: boolean
    noBackground?: boolean
}

/**
 * A custom View component that applies root or content styling based on the isRoot prop.
 * Adds a background to the root view.
 * @param children
 * @param className
 * @param isContent
 * @param isRoot
 * @param noBackground
 * @param props
 * @constructor
 */
export default function AppView({
    children,
    className = '',
    isRoot,
    noBackground,
    ...props
}: AppViewProps) {
    if (isRoot) {
        return (
            <>
                {!noBackground && <BackgroundCircles />}
                <View
                    className={`${tabRootStyling} ${className} max-w-lg`}
                    {...props}
                >
                    {children}
                </View>
            </>
        )
    }

    return (
        <View className={`${tabContentStyling} ${className}`} {...props}>
            {children}
        </View>
    )
}
