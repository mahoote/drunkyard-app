import React from 'react'
import { View } from 'react-native'
import AppText from '@/app/components/text/AppText'
import AppView from '@/app/components/views/AppView'

interface AppPageLayoutProps {
    children: React.ReactNode
    title?: string
    subtitle?: string
    navComponent?: React.ReactNode
    footerComponent?: React.ReactNode
    titleComponent?: React.ReactNode
}

/**
 * A generic layout for a page in the app.
 * Contains a title, subtitle, navigation component, footer component and children.
 * The title can be replaced with a custom title component.
 * @param children
 * @param title
 * @param subtitle
 * @param navComponent
 * @param footerComponent
 * @param titleComponent
 * @constructor
 */
export default function AppPageLayout({
    children,
    title,
    subtitle,
    navComponent,
    footerComponent,
    titleComponent,
}: AppPageLayoutProps) {
    // Allows for a custom title component to be passed in.
    let displayTitleComponent: React.ReactNode = (
        <AppText size="display-sm-regular" className="text-center">
            {title}
        </AppText>
    )

    if (!title && titleComponent) {
        displayTitleComponent = titleComponent
    }

    return (
        <AppView isRoot={true} className="h-full">
            <AppView className="items-center justify-between flex-1">
                <View className="items-center">
                    {navComponent}
                    <AppView className="gap-8">
                        <View className="gap-5">
                            {displayTitleComponent}
                            {subtitle && (
                                <AppText className="text-center">
                                    {subtitle}
                                </AppText>
                            )}
                        </View>
                        {children}
                    </AppView>
                </View>
                {footerComponent}
            </AppView>
        </AppView>
    )
}
