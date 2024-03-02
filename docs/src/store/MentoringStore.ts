import {create} from 'zustand';

type useStoreProps = {
	mentoringId: number;
	schedule: string;
	amount: string;
	setMentoringId: (mentoringId: number) => void;
	setSchedule: (schedule: string) => void;
	setAmount: (amount: string) => void;
};

export const MentoringStore = create<useStoreProps>()(set => ({
	mentoringId: 0,
	schedule: '',
	amount: '',
	setMentoringId: mentoringId => set({mentoringId}),
	setSchedule: schedule => set({schedule}),
	setAmount: amount => set({amount}),
}));
