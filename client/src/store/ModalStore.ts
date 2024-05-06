import {create} from 'zustand';

type useStoreProps = {
	modalChildren: React.ReactNode;
	setModalChildren: (children: React.ReactNode) => void;
	isModalOpen: boolean;
	setModalOpen: () => void;
	setModalClose: () => void;
};

const ModalStore = create<useStoreProps>()(set => ({
	modalChildren: null,
	setModalChildren: (modalChildren: React.ReactNode) =>
		set((state: {modalChildren: React.ReactNode}) => ({modalChildren})),
	isModalOpen: false,
	setModalOpen: () => set({isModalOpen: true}),
	setModalClose: () => set({isModalOpen: false}),
}));

export default ModalStore;
