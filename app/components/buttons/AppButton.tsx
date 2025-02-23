import LottieView from 'lottie-react-native'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import AppText from '@/app/components/text/AppText'

interface AppButtonProps extends TouchableOpacityProps {
    title: string
    size?: 'small' | 'large'
    color?: 'primary-400' | 'secondary-900'
    fullWidth?: boolean
    loading?: boolean
}

/**
 * Displays a custom button with a title.
 * Two different sizes are available: small and large.
 * - Default size: large
 * - Default color: secondary-900
 * @param title
 * @param size
 * @param color
 * @param fullWidth
 * @param loading
 * @param props
 * @constructor
 */
export default function AppButton({
    title,
    size = 'large',
    color = 'secondary-900',
    fullWidth = true,
    loading = false,
    ...props
}: AppButtonProps) {
    const buttonBackgroundColor =
        color === 'primary-400' ? 'bg-primary-400' : 'bg-secondary-900'

    const buttonTextColor =
        color === 'primary-400' ? 'text-background' : 'text-foreground'

    const width = fullWidth ? 'w-full' : 'w-fit'

    let buttonStyles = 'rounded-xl p-1 ios:p-2'
    let textSize = 'text-xl-semibold'
    let loaderHeight = 35
    let loaderWidth = 50

    if (size === 'large') {
        buttonStyles = 'rounded-2xl p-2 ios:p-3'
        textSize = 'display-sm-semibold'
        loaderHeight = 51
        loaderWidth = 70
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            className={`${buttonStyles} ${buttonBackgroundColor} ${width} items-center justify-center`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <View className={`w-[${loaderWidth}] h-[${loaderHeight}]`}>
                    <LottieView
                        source={require('@/assets/animations/dots.json')}
                        autoPlay
                        loop
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            ) : (
                <AppText
                    size={textSize}
                    className="text-center"
                    verticalAlign={true}
                    color={buttonTextColor}
                >
                    {title}
                </AppText>
            )}
        </TouchableOpacity>
    )
}
