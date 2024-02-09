import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export type createMentorResponse = {
	mentorName: string;
	field: string;
	career: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
};

export const createMentor = async (body: createMentorResponse) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.post(
			`${baseUrl}/mentor/create`,
			{
				mentorName: body.mentorName,
				field: body.field,
				career: body.career,
				task: body.task,
				email: body.email,
				phone: body.phone,
				aboutMe: body.aboutMe,
				github: body.github,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': 'true',
					Authorization: `${authorToken}`,
					RefreshToken: `${refreshToken}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('멘토등록 실패', error);
		throw error;
	}
};
