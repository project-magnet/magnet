import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export type createMentoringData = {
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};

export const createMentoring = async (data: createMentoringData) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.post(
			`${baseUrl}/mentoring/create`,
			{
				title: data.title,
				content: data.content,
				pay: data.pay,
				period: data.period,
				participants: data.participants,
				category: data.category,
			},
			{
				headers: {
					Authorization: authorToken,
					RefreshToken: refreshToken,
				},
			},
		);
		return response;
	} catch (error) {
		console.error('멘토링 생성 실패', error);
		throw error;
	}
};
