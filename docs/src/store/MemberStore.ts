import {getMemberResponse} from '../api/member';
import {create} from 'zustand';

type useStoreProps = {
	globalMember: getMemberResponse;
	setGlobalMember: (member: getMemberResponse) => void;
};

export const MemberStore = create<useStoreProps>()(set => ({
	globalMember: {
		id: 0,
		username: '',
		nickName: '',
		email: '',
		phone: '',
		picture: null,
		memberStatus: '',
		city: '',
		street: '',
		roles: [],
		menteeList: [],
		mentorList: [],
	},
	setGlobalMember: globalMember => set({globalMember}),
}));
