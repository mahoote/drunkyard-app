const generateFontStyles = () => {
    const sizes = [
        { prefix: 'display-2xl', fontSize: '72px' },
        { prefix: 'display-xl', fontSize: '60px' },
        { prefix: 'display-lg', fontSize: '48px' },
        { prefix: 'display-md', fontSize: '36px' },
        { prefix: 'display-sm', fontSize: '30px' },
        { prefix: 'display-xs', fontSize: '24px' },
        { prefix: 'text-xl', fontSize: '20px' },
        { prefix: 'text-lg', fontSize: '18px' },
        { prefix: 'text-md', fontSize: '16px' },
        { prefix: 'text-sm', fontSize: '14px' },
        { prefix: 'text-xs', fontSize: '12px' },
    ]

    const weights = [
        { suffix: 'regular', fontFamily: 'Poppins_400Regular' },
        { suffix: 'light-italic', fontFamily: 'Poppins_300Light_Italic' },
        { suffix: 'medium', fontFamily: 'Poppins_500Medium' },
        { suffix: 'semibold', fontFamily: 'Poppins_600SemiBold' },
        { suffix: 'bold', fontFamily: 'Poppins_700Bold' },
    ]

    const utilities = {}

    sizes.forEach(({ prefix, fontSize, lineHeight }) => {
        weights.forEach(({ suffix, fontFamily }) => {
            const className = `${prefix}-${suffix}`
            utilities[`.${className}`] = {
                fontSize,
                lineHeight,
                fontFamily,
            }
        })
    })

    return utilities
}

module.exports = generateFontStyles
