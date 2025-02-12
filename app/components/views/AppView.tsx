import React from 'react'
import { KeyboardAvoidingView, Platform, View, ViewProps } from 'react-native'
import BackgroundCircles from '@/app/components/BackgroundCircles'
import { tabContentStyling, tabRootStyling } from '@/src/utils/tabRootStyling'

interface AppViewProps extends ViewProps {
    children: React.ReactNode
    className?: string
    isRoot?: boolean
    isContent?: boolean
    noBackground?: boolean
    isKeyboardAvoiding?: boolean
}

/**
 * A custom View component that applies styling based on the isRoot and isContent props.
 * @param children
 * @param className
 * @param isContent
 * @param isRoot
 * @param noBackground
 * @param isKeyboardAvoiding
 * @param props
 * @constructor
 */
export default function AppView({
    children,
    className = '',
    isContent = true,
    isRoot,
    noBackground,
    isKeyboardAvoiding,
    ...props
}: AppViewProps) {
    if (isRoot) {
        if (isKeyboardAvoiding) {
            return (
                <>
                    {!noBackground && <BackgroundCircles />}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className={`${tabRootStyling} ${className} max-w-lg`}
                        {...props}
                    >
                        {children}
                    </KeyboardAvoidingView>
                </>
            )
        }

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
