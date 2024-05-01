import {create} from 'zustand';

type useStoreProps = {
	modalChildren: React.ReactNode;
	setModalChildren: (children: React.ReactNode) => void;
	closeModal: () => void;
};

const ModalStore = create<useStoreProps>()(set => ({
	modalChildren: null,
	setModalChildren: (modalChildren: React.ReactNode) =>
		set((state: {modalChildren: React.ReactNode}) => ({modalChildren})),
	closeModal: () => set({modalChildren: null}),
}));

export default ModalStore;
