/** @type {import('tailwindcss').Config} */

const bounce =
	'linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%)';
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
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
			PartialSansKR_Regular: ['PartialSansKR-Regular', 'sans-serif'],
			GmarketSansMedium: ['GmarketSansMedium', 'sans-serif'],
		},
		animation: {
			blink: 'blink 1.5s step-end infinite',
			fadeIn: 'fadeIn 0.5s ease-in-out forwards',
			upALittle: 'upALittle 0.1s forwards',
			downALittle: `downALittle 1s ${bounce} forwards`,
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
			downALittle: {
				'0%': {transform: 'translateY(-20px)'},
				'100%': {transform: 'translateY(0px)'},
			},
			upALittle: {
				'0%': {transform: 'translateY(0px)'},
				'100%': {transform: 'translateY(-20px)'},
			},
		},
		fontSize: {
			'2xs': '0.625rem',
			'3xs': '0.5rem',
		},
	},
};
export const plugins = [];
