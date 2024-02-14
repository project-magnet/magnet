import {create} from 'zustand';
import {getMemberResponse} from '../api/member';

type useStoreProps = {
	member: getMemberResponse;
	setMember: (member: getMemberResponse) => void;
};

export const UserStore = create<useStoreProps>(set => ({
	member: {
		id: 0,
		username: '',
		nickName: '',
		email: '',
		phone: '',
		picture: '',
		memberStatus: '',
		city: '',
		street: '',
		roles: ['', ''],
	},
	setMember: (member: getMemberResponse) => set({member}),
}));
