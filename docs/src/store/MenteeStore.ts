import {create} from 'zustand';

type useStoreProps = {
	message: string;
	phone: string;
	email: string;
	setMessage: (message: string) => void;
	setPhone: (phone: string) => void;
	setEmail: (email: string) => void;
};

export const MenteeStore = create<useStoreProps>()(set => ({
	message: '',
	phone: '',
	email: '',
	setMessage: message => set({message}),
	setPhone: phone => set({phone}),
	setEmail: email => set({email}),
}));
