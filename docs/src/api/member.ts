import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export type getMemberResponse = {
	id: number;
	username: string;
	nickName: string;
	email: string;
	phone: string;
	picture: any;
	memberStatus: string;
	city: string;
	street: string;
	roles: string[];
};

export const getMember = async (): Promise<getMemberResponse> => {
	const authorToken = sessionStorage.getItem('Authorization');
	const refreshToken = sessionStorage.getItem('RefreshToken');
	try {
		const response = await axios.get<getMemberResponse>(`${baseUrl}/member/get`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('회원정보 불러오기 실패', error);
		throw error;
	}
};

export const deleteMember = async () => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		await axios.delete(`${baseUrl}/member/delete`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
	} catch (error) {
		console.error('회원 탈퇴 실패', error);
		throw error;
	}
};
