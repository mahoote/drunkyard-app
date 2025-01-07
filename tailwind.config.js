/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        colors: {
            foreground: '#E8E8EA',
            background: '#030323',
            primary: {
                50: '#f8f7fb',
                100: '#f2f1f6',
                200: '#e5e4f0',
                300: '#d1cfe3',
                400: '#b0aacd',
                500: '#9d93bf',
                600: '#897aad',
                700: '#77679a',
                800: '#645681',
                900: '#52486a',
                950: '#352e47',
            },
            secondary: {
                50: '#f0f1fd',
                100: '#e4e6fb',
                200: '#ced0f7',
                300: '#b0b2f1',
                400: '#9490e9',
                500: '#8275df',
                600: '#715ad1',
                700: '#614ab8',
                800: '#503e95',
                900: '#443978',
                950: '#282145',
            },
            avatar: {
                1: '#7BA4DB',
                2: '#9DB4A8',
                3: '#E6E18D',
                4: '#E7A9A9',
                5: '#B5A3D0',
                6: '#F3B08C',
            },
        },
        extend: {},
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const fontStyles = [
                {
                    name: 'display-2xl-regular',
                    fontSize: '72px',
                    lineHeight: '88px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-2xl-medium',
                    fontSize: '72px',
                    lineHeight: '88px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-2xl-semibold',
                    fontSize: '72px',
                    lineHeight: '88px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-2xl-bold',
                    fontSize: '72px',
                    lineHeight: '88px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'display-xl-regular',
                    fontSize: '60px',
                    lineHeight: '73px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-xl-medium',
                    fontSize: '60px',
                    lineHeight: '73px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-xl-semibold',
                    fontSize: '60px',
                    lineHeight: '73px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-xl-bold',
                    fontSize: '60px',
                    lineHeight: '73px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'display-lg-regular',
                    fontSize: '48px',
                    lineHeight: '59px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-lg-medium',
                    fontSize: '48px',
                    lineHeight: '59px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-lg-semibold',
                    fontSize: '48px',
                    lineHeight: '59px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-lg-bold',
                    fontSize: '48px',
                    lineHeight: '59px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'display-md-regular',
                    fontSize: '36px',
                    lineHeight: '44px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-md-medium',
                    fontSize: '36px',
                    lineHeight: '44px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-md-semibold',
                    fontSize: '36px',
                    lineHeight: '44px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-md-bold',
                    fontSize: '36px',
                    lineHeight: '44px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'display-sm-regular',
                    fontSize: '30px',
                    lineHeight: '37px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-sm-medium',
                    fontSize: '30px',
                    lineHeight: '37px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-sm-semibold',
                    fontSize: '30px',
                    lineHeight: '37px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-sm-bold',
                    fontSize: '30px',
                    lineHeight: '37px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'display-xs-regular',
                    fontSize: '24px',
                    lineHeight: '29px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'display-xs-medium',
                    fontSize: '24px',
                    lineHeight: '29px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'display-xs-semibold',
                    fontSize: '24px',
                    lineHeight: '29px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'display-xs-bold',
                    fontSize: '24px',
                    lineHeight: '29px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'text-xl-regular',
                    fontSize: '20px',
                    lineHeight: '30px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'text-xl-medium',
                    fontSize: '20px',
                    lineHeight: '30px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'text-xl-semibold',
                    fontSize: '20px',
                    lineHeight: '30px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'text-xl-bold',
                    fontSize: '20px',
                    lineHeight: '30px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'text-lg-regular',
                    fontSize: '18px',
                    lineHeight: '27px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'text-lg-medium',
                    fontSize: '18px',
                    lineHeight: '27px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'text-lg-semibold',
                    fontSize: '18px',
                    lineHeight: '27px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'text-lg-bold',
                    fontSize: '18px',
                    lineHeight: '27px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'text-md-regular',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'text-md-medium',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'text-md-semibold',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'text-md-bold',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'text-sm-regular',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'text-sm-medium',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'text-sm-semibold',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'text-sm-bold',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontFamily: 'Poppins_700Bold',
                },
                {
                    name: 'text-xs-regular',
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontFamily: 'Poppins_400Regular',
                },
                {
                    name: 'text-xs-medium',
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontFamily: 'Poppins_500Medium',
                },
                {
                    name: 'text-xs-semibold',
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontFamily: 'Poppins_600SemiBold',
                },
                {
                    name: 'text-xs-bold',
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontFamily: 'Poppins_700Bold',
                },
            ]

            const utilities = fontStyles.reduce((acc, style) => {
                acc[`.${style.name}`] = {
                    fontSize: style.fontSize,
                    lineHeight: style.lineHeight,
                    fontFamily: style.fontFamily,
                }
                return acc
            }, {})

            addUtilities(utilities, ['responsive'])
        }),
    ],
}
