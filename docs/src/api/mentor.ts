import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';

export type createMentorData = {
	mentorName: string;
	field: string;
	career: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
};

export const createMentor = async (data: createMentorData) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.post(
			`${baseUrl}/mentor/create`,
			{
				mentorName: data.mentorName,
				field: data.field,
				career: data.career,
				task: data.task,
				email: data.email,
				phone: data.phone,
				aboutMe: data.aboutMe,
				github: data.github,
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

export type MentoringDtoList = {
	id: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};
export type getMentorData = {
	mentorId: number;
	mentorName: string;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
	mentoringDtoList: MentoringDtoList[];
};

export const getMentor = async (): Promise<getMentorData> => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.get<getMentorData>(`${baseUrl}/mentor/get`, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('멘토정보 불러오기 실패', error);
		throw error;
	}
};
