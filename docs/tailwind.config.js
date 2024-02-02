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
			},
			keyframes: {
				blink: {
					'0%, 100%': {opacity: 1},
					'50%': {opacity: 0},
				},
			},
		},
	},
	plugins: [],
};
