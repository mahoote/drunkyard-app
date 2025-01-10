import React from 'react'
import { View, ViewProps } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'
import { tabContentStyling, tabRootStyling } from '@/app/utils/tabRootStyling'

interface AppViewProps extends ViewProps {
    children: React.ReactNode
    className?: string
    isRoot?: boolean
    isContent?: boolean
    noBackground?: boolean
}

export default function AppView({
    children,
    className = '',
    isContent = true,
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
    if (isContent) {
        return (
            <View className={`${tabContentStyling} ${className}`} {...props}>
                {children}
            </View>
        )
    }

    return (
        <View className={className} {...props}>
            {children}
        </View>
    )
}
