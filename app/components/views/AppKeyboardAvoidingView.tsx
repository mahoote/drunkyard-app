import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

interface AppKeyboardAvoidingViewProps {
    children: React.ReactNode
    isFlex?: boolean
}

/**
 * A custom KeyboardAvoidingView component that wraps children in a ScrollView.
 * @param children
 * @param isFlex
 * @constructor
 */
export default function AppKeyboardAvoidingView({
    children,
    isFlex = true,
}: AppKeyboardAvoidingViewProps) {
    const flexClass = isFlex ? 'flex-1' : ''

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className={flexClass}
            >
                <ScrollView
                    bounces={false}
                    contentContainerClassName={flexClass}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
