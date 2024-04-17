import axios from 'axios';
import {saveAuthTokens} from '../utils/auth/saveAuthTokens';
import {removeAuthTokens} from '../utils/auth/removeAuthTokens';

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
		const respone = await axios.post(`${baseUrl}/member/signup`, {
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
		console.log('회원가입 성공', respone.data);
		return respone.data;
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
		console.log('로그인 성공', response.data);
		saveAuthTokens({
			Authorization: response.headers.authorization,
			RefreshToken: response.headers.refreshtoken,
		});
		return response.data;
	} catch (error) {
		removeAuthTokens();
		console.error('로그인 실패', error);
		throw error;
	}
};

export const logout = async () => {};
