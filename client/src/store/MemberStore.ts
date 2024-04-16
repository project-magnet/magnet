import {getMemberResponse} from '../api/member';
import {create} from 'zustand';

type useStoreProps = {
	globalMember: getMemberResponse | null;
	setGlobalMember: (member: getMemberResponse) => void;
	resetGlobalMember: () => void;
};

export const MemberStore = create<useStoreProps>()(set => ({
	globalMember: null,
	setGlobalMember: globalMember => set({globalMember}),
	resetGlobalMember: () =>
		set({
			globalMember: null,
		}),
}));
