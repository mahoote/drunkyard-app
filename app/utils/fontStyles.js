const generateFontStyles = () => {
    const sizes = [
        { prefix: 'display-2xl', fontSize: '72px', lineHeight: '88px' },
        { prefix: 'display-xl', fontSize: '60px', lineHeight: '73px' },
        { prefix: 'display-lg', fontSize: '48px', lineHeight: '59px' },
        { prefix: 'display-md', fontSize: '36px', lineHeight: '44px' },
        { prefix: 'display-sm', fontSize: '30px', lineHeight: '37px' },
        { prefix: 'display-xs', fontSize: '24px', lineHeight: '29px' },
        { prefix: 'text-xl', fontSize: '20px', lineHeight: '30px' },
        { prefix: 'text-lg', fontSize: '18px', lineHeight: '27px' },
        { prefix: 'text-md', fontSize: '16px', lineHeight: '24px' },
        { prefix: 'text-sm', fontSize: '14px', lineHeight: '21px' },
        { prefix: 'text-xs', fontSize: '12px', lineHeight: '18px' },
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
