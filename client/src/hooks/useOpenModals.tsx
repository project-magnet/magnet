import ModalStore from '../store/ModalStore';
import {LoginModal} from '../component/auth/LoginModal';
import PaymentModal from '../component/payment/PaymentModal';
import {MentorRegistModal} from '../component/user/MentorRegistModal';
import {MenteeListModal} from '../component/user/CreatedMentoringBox';

// React.ComponentType<P>는 P 타입의 props를 받는 React 컴포넌트를 의미.
const useOpenModal = <P extends object>(ModalComponent: React.ComponentType<P>) => {
	const {setModalContent, openModal} = ModalStore();

	return (props?: P) => {
		// {...(props || ({} as P))} 는 props가 있으면 그대로 전달하고, 없으면 빈 객체를 전달하는 코드
		setModalContent(<ModalComponent {...(props || ({} as P))} />);
		openModal();
	};
};

// 로그인 모달 열기
export const useOpenLoginModal = () => useOpenModal(LoginModal);

// 결제 모달 열기
export const useOpenPaymentModal = () => useOpenModal(PaymentModal);

// 멘토 등록 모달 열기
export const useOpenMentorRegistModal = () => useOpenModal(MentorRegistModal);

// 멘티 리스트 모달 열기
export const useOpenMenteeListModal = () => useOpenModal(MenteeListModal);
