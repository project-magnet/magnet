import {create} from 'zustand';

type useStoreProps = {
	mentoringId: number;
	schedule: string;
	amount: string;
	mentoringData: getMentoringData | null;
	setMentoringId: (mentoringId: number) => void;
	setSchedule: (schedule: string) => void;
	setAmount: (amount: string) => void;
	setMentoringData: (MentoringData: getMentoringData) => void;
};

type getMentoringData = {
	mentoringId: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
	mentorId: number;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
};

export const MentoringStore = create<useStoreProps>()(set => ({
	mentoringId: 0,
	schedule: '',
	amount: '',
	mentoringData: null,
	setMentoringId: mentoringId => set({mentoringId}),
	setSchedule: schedule => set({schedule}),
	setAmount: amount => set({amount}),
	setMentoringData: mentoringData => set({mentoringData}),
}));
