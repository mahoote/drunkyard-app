import * as dotenv from 'dotenv'

dotenv.config({
    path:
        process.env.NODE_ENV === 'production'
            ? '.env.production'
            : '.env.local',
})

export default {
    expo: {
        name: 'dg-app',
        slug: 'dg-app',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'dev.teigen',
        platforms: ['ios', 'android', 'web'],
        userInterfaceStyle: 'dark',
        newArchEnabled: true,
        backgroundColor: '#030323',

        extra: {
            EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
            EXPO_PUBLIC_SUPABASE_ANON_KEY:
                process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
        },

        ios: {
            supportsTablet: true,
        },

        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            package: 'dev.teigen.dgapp',
            intentFilters: [
                {
                    action: 'VIEW',
                    data: [
                        {
                            scheme: 'dev.teigen',
                            host: 'auth',
                            pathPrefix: '/callback',
                        },
                    ],
                    category: ['BROWSABLE', 'DEFAULT'],
                },
            ],
        },

        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },

        plugins: [
            'expo-router',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                },
            ],
        ],

        experiments: {
            typedRoutes: true,
        },
    },
}
