import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';
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
		console.log(baseUrl);
		await axios.post(`${baseUrl}/member/signup`, {
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
	} catch (error) {
		console.error('회원가입 실패', error);
		throw error;
	}
};

type loginBody = {
	email: string;
	password: string;
};
export const login = async (body: loginBody) => {
	try {
		const response = await axios.post(`${baseUrl}/auth/login`, {
			username: body.email,
			password: body.password,
		});
		sessionStorage.setItem('Authorization', response.headers.authorization);
		sessionStorage.setItem('RefreshToken', response.headers.refreshtoken);
	} catch (error) {
		console.error('로그인 실패', error);
		throw error;
	}
};

export const logout = async () => {};
