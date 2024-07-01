import {create} from 'zustand';

type useStoreProps = {
	modalContent: React.ReactNode; // 모달에 표시될 내용
	setModalContent: (content: React.ReactNode) => void; // 모달 내용을 설정하는 함수
	isModalOpen: boolean; // 모달이 열려 있는지 여부를 나타내는 상태
	openModal: () => void; // 모달을 여는 함수
	closeModal: () => void; // 모달을 닫는 함수
};

const ModalStore = create<useStoreProps>()(set => ({
	modalContent: null,
	setModalContent: (modalContent: React.ReactNode) =>
		set((state: {modalContent: React.ReactNode}) => ({modalContent})),
	isModalOpen: false,
	openModal: () => set({isModalOpen: true}),
	closeModal: () => set({isModalOpen: false}),
}));

export default ModalStore;
