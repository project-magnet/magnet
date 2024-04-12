import {create} from 'zustand';

type useStoreProps = {
	isOpen: boolean;
	message: string;
	setMessage: (message: string) => void;
	type: 'success' | 'error' | 'warning';
	setType: (type: 'success' | 'error' | 'warning') => void;
	setIsOpenTrue: () => void;
	setIsOpenFalse: () => void;
};

export const ToastPopupStore = create<useStoreProps>()(set => ({
	isOpen: false,
	message: '',
	setMessage: (message: string) => set((state: {message: string}) => ({message})),
	type: 'success',
	setType: (type: 'success' | 'error' | 'warning') =>
		set((state: {type: 'success' | 'error' | 'warning'}) => ({type})),
	setIsOpenTrue: () => set((state: {isOpen: boolean}) => ({isOpen: true})),
	setIsOpenFalse: () => set((state: {isOpen: boolean}) => ({isOpen: false})),
}));
