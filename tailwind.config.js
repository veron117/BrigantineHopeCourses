// tailwind.config.js
module.exports = {
    theme: {
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