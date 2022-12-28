import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const colors = {
    green: {
        50: '#ebf9e7',
        100: '#d0e8c8',
        200: '#b3d7a7',
        300: '#96c785',
        400: '#78b763',
        500: '#5f9d49',
        600: '#497a38',
        700: '#335727',
        800: '#1d3416',
        900: '#041300',
    },
    gray: {
        50: '#edf1fc',
        100: '#d2d6e2',
        200: '#b6bac9',
        300: '#999fb2',
        400: '#7c839c',
        500: '#626a82',
        600: '#4c5266',
        700: '#363b49',
        800: '#1f232e',
        900: '#080c16',
    },
}

const theme = extendTheme({ config, colors })

export default theme
