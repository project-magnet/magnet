import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export type createMenteeData = {
	message: string;
	schedule: string;
	phone: string;
	mentoringId: number;
	email: string;
	paymentKey: string | null;
};

export const createMentee = async (data: createMenteeData) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization') || '';
		const refreshToken = sessionStorage.getItem('RefreshToken') || '';
		const response = await axios.post(
			`${baseUrl}/mentee/create`,
			{
				message: data.message,
				schedule: data.schedule,
				phone: data.phone,
				mentoringId: data.mentoringId,
				paymentKey: data.paymentKey,
				email: data.email,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': 'true',
					Authorization: authorToken,
					RefreshToken: refreshToken,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('멘티등록 실패', error);
		throw error;
	}
};

export const getMenteeList = async (mentoringId: number) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization') || '';
		const refreshToken = sessionStorage.getItem('RefreshToken') || '';
		const response = await axios.get(`${baseUrl}/mentee/list/${mentoringId}`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: authorToken,
				RefreshToken: refreshToken,
			},
		});
		return response.data;
	} catch (error) {
		console.error('멘티리스트 조회 실패', error);
		throw error;
	}
};
