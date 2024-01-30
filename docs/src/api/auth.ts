import axios from 'axios';
// ngrok 오류날 시 헤더에 사용
//   headers: {
//     'Content-Type': 'application/json',
//     'ngrok-skip-browser-warning': 'true',
//   }

const baseUrl = process.env.REACT_APP_BASE_URL || '';

type signupBody = {
	email: string;
	password: string;
	username: string;
	nickName: string;
	phone: string;
	addressDto: {
		city: string | null;
		street: string | null;
	};
};
export const signup = async (data: signupBody) => {
	try {
		const response = await axios.post(baseUrl, {
			email: data.email,
			password: data.password,
			username: data.username,
			nickName: data.nickName,
			phone: data.phone,
			addressDto: {
				city: data.addressDto.city,
				street: data.addressDto.street,
			},
		});

		if (response.status === 200) {
			return {isSuccess: true, message: '회원가입에 성공했습니다.'};
		} else {
			return {
				isSuccess: false,
				message: '회원가입에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.',
			};
		}
	} catch (error) {
		console.error('회원가입 실패', error);
		return {
			isSuccess: false,
			message: '회원가입에 실패했습니다. 네트워크를 확인하세요.',
		};
	}
};

type loginBody = {
	email: string;
	password: string;
};
export const login = async (body: loginBody) => {
	try {
		const response = await axios.post(baseUrl, {
			email: body.email,
			password: body.password,
		});

		if (response.status === 200 && response.data.token) {
			sessionStorage.setItem('jwtToken', response.data.token);
			return {isSuccess: true, message: '로그인에 성공했습니다.'};
		} else {
			return {
				isSuccess: false,
				message: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.',
			};
		}
	} catch (error) {
		console.error('로그인 실패', error);
		return {
			isSuccess: false,
			message: '로그인에 실패했습니다. 네트워크를 확인하세요.',
		};
	}
};

export const logout = async () => {};
