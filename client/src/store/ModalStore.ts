import {create} from 'zustand';

type useStoreProps = {
	isOpen: boolean;
	children: React.ReactNode;
	setChildren: (children: React.ReactNode) => void;
	setIsOpenTure: () => void;
	setIsOpenFalse: () => void;
};

const ModalStore = create<useStoreProps>()(set => ({
	isOpen: false,
	children: null,
	setChildren: (children: React.ReactNode) =>
		set((state: {children: React.ReactNode}) => ({children})),
	setIsOpenTure: () => set((state: {isOpen: boolean}) => ({isOpen: true})),
	setIsOpenFalse: () => set((state: {isOpen: boolean}) => ({isOpen: false})),
}));

export default ModalStore;
