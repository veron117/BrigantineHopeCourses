// tailwind.config.js
module.exports = {
    theme: {
        screens: {
            'xxs': '360px',
            'xs': '375px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            'tall': { 'raw': '(min-height: 800px)' },
            'wide': { 'raw': '(min-width: 1400px)' },
        },
        extend: {
            colors: {
                primary: '#4361ee',
                'primary-dark': '#3a56d4',
                secondary: '#3f37c9',
                accent: '#4895ef',
                light: '#f8f9fa',
                dark: '#212529',
                gray: '#6c757d',
                success: '#4cc9f0',
                white: '#ffffff',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                'responsive-sm': 'clamp(0.875rem, 2vw, 1rem)',
                'responsive-base': 'clamp(1rem, 2.5vw, 1.125rem)',
                'responsive-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
                'responsive-xl': 'clamp(1.5rem, 4vw, 2.25rem)',
                'responsive-2xl': 'clamp(1.875rem, 5vw, 3rem)',
            },
            spacing: {
                'responsive-sm': 'clamp(0.5rem, 2vw, 1rem)',
                'responsive-md': 'clamp(1rem, 3vw, 2rem)',
                'responsive-lg': 'clamp(1.5rem, 4vw, 3rem)',
                'responsive-xl': 'clamp(2rem, 5vw, 4rem)',
            },
            boxShadow: {
                custom: '0 4px 6px rgba(0, 0, 0, 0.1)',
                btn: '0 4px 15px rgba(67, 97, 238, 0.3)',
                btnHover: '0 6px 20px rgba(67, 97, 238, 0.4)',
            },
            borderRadius: {
                btn: '50px',
                container: '12px',
            },
            clipPath: {
                header: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                footer: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
            },
        },
    },
    plugins: [],
}