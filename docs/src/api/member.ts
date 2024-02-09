import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export const getMember = async () => {
	const authorToken = sessionStorage.getItem('Authorization');
	const refreshToken = sessionStorage.getItem('RefreshToken');
	try {
		const response = await axios.get(`${baseUrl}/member/get`, {
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
