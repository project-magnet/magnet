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
		console.log('멘토등록 성공', response.data);
		return response.data;
	} catch (error) {
		console.error('멘토등록 실패', error);
		throw error;
	}
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
type MentoringDtoList = {
	id: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
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
		console.log('멘토정보 불러오기 성공', response.data);
		return response.data;
	} catch (error) {
		console.error('멘토정보 불러오기 실패', error);
		throw error;
	}
};

export type getMentorListData = {
	content: Content[];
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: Sort2;
	first: boolean;
	numberOfElements: number;
	empty: boolean;
};

interface Content {
	mentorId: number;
	mentorName: string;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
	mentoringId: number;
	mentoringTitle: string;
	mentoringContent: string;
	mentoringPay: string;
	mentoringPeriod: string;
	mentoringParticipants: number;
	mentoringCategory: string;
}

interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

interface Sort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

interface Sort2 {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

export const getMentorList = async (offset: number, size: number): Promise<getMentorListData> => {
	try {
		const response = await axios.get<getMentorListData>(
			`${baseUrl}/mentor/list?offset=${offset}&size=${size}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': 'true',
				},
			},
		);
		console.log('멘토 리스트 불러오기 성공', response.data);
		return response.data;
	} catch (error) {
		console.error('멘토 리스트 불러오기 실패', error);
		throw error;
	}
};
