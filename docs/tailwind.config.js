/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#ffffff',
				primary: '#111111',
				secondary: '#888888',
				additional1: '#FF8C00 ',
				additional2: '#FF9900',
				additional3: '#FFCC00 ',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
			animation: {
				blink: 'blink 1.5s step-end infinite',
				fadeIn: 'fadeIn 0.5s ease-in-out forwards',
			},
			keyframes: {
				blink: {
					'0%, 100%': {opacity: 1},
					'50%': {opacity: 0},
				},
				fadeIn: {
					'0%': {opacity: 0},
					'100%': {opacity: 1},
				},
			},
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem',
			},
		},
	},
	plugins: [],
};
