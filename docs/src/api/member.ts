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
	menteeList: any;
	mentorList: any;
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
		console.log('회원정보 불러오기 성공', response.data);
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
		const response = await axios.delete(`${baseUrl}/member/delete`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
		console.log('회원 탈퇴 성공', response.data);
		return response.data;
	} catch (error) {
		console.error('회원 탈퇴 실패', error);
		throw error;
	}
};

export type updateMemberData = {
	nickName: string;
	addressDto: {city: string; street: string};
};

export const updateMember = async (data: updateMemberData) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.patch(`${baseUrl}/member/update`, data, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
		console.log('회원정보 수정 성공', response.data);
		return response.data;
	} catch (error) {
		console.error('회원정보 수정 실패', error);
		throw error;
	}
};
