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
				GasoekOne: ['GasoekOne-Regular', 'sans-serif'],
				SEBANG_Gothic_Bold: ['SEBANG_Gothic_Bold', 'sans-serif'],
				PartialSansKR_Regular: ['PartialSansKR-Regular', 'sans-serif'],
			},
			animation: {
				blink: 'blink 1.5s step-end infinite',
				fadeIn: 'fadeIn 0.5s ease-in-out forwards',
				// upALittel은 호버가 끝니면 부드럽게 돌아옵니다
				upALittle: 'upALittle 0.2s ease-in-out forwards',
				downALittle: 'downALittle 0.2s ease-in-out forwards',
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
				upALittle: {
					'0%': {paddingTop: '0px', marginBottom: '20px'},
					'100%': {paddingTop: '20px', marginBottom: '0px'},
				},
				downALittle: {
					'0%': {paddingTop: '20px', marginBottom: '0px'},
					'100%': {paddingTop: '0px', marginBottom: '20px'},
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
