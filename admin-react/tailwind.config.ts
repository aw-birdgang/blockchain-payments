import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/sample/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontSize: {
            xs: ['10px', '14px'],
            sm: ['12px', '18px'],
            base: ['14px', '22px'],
            lg: ['16px', '26px'],
            xl: ['18px', '26px'],
            '2xl': ['22px', '30px'],
            '3xl': ['28px', '34px'],
            '4xl': ['34px', '38px'],
        },
        extend: {
            colors: {
                // 대표 칼라
                // legacy color palette
                'main': '#D51317',
                'mainLight0': '#FFEBEE',
                'mainLight1': '#bfdbfe',
                'mainLight2': '#D51317',
                'mainDark1': '#A6160D',
                'gray90': '#131515',
                'gray50': '#90949A',
                'gray30': '#E4E7EB',
                'yellow': '#FED602',
                'red': '#F52324',
                'lightYellow': '#FFEE93',

                // new color palette
                'primary-light': '#FFEBEE',
                'primary': '#D51317',
                'primary-dark': '#A6160D',
                'white': '#FFFFFF',
                'black': '#000000',
                'blue-light': '#CFD9FF',
                'blue': '#1F50FF',
                'blue-dark': '#001672',
                'gray01': '#F2F4F5',
                'gray02': '#D6DADE',
                'gray03': '#ADB3BA',
                'gray04': '#949CA6',
                'gray05': '#6B7685',
                'gray06': '#323D4C',
                'gray07': '#191F28',
            },
        },
    },
    plugins: [],
};

export default config;
