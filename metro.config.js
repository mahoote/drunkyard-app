const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

// Update the transformer to handle SVG files
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
}

// Update the resolver to support SVG and .lottie files
config.resolver = {
    ...config.resolver,
    assetExts: [
        ...config.resolver.assetExts.filter(ext => ext !== 'svg'),
        'lottie',
    ],
    sourceExts: [...config.resolver.sourceExts, 'svg'],
}

// Integrate NativeWind with global CSS
module.exports = withNativeWind(config, { input: './global.css' })
