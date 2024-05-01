import ModalStore from '../store/ModalStore';
import {LoginModal} from '../component/auth/LoginModal';
import PaymentModal from '../component/payment/PaymentModal';
import {MentorRegistModal} from '../component/user/MentorRegistModal';

// 모달 열기 훅
export const useOpenModal = (ModalComponent: () => JSX.Element) => {
	const {setModalChildren} = ModalStore();

	return () => setModalChildren(<ModalComponent />);
};

// 로그인 모달 열기
export const useOpenLoginModal = () => useOpenModal(LoginModal);

// 결제 모달 열기
export const useOpenPaymentModal = () => useOpenModal(PaymentModal);

// 멘토 등록 모달 열기
export const useOpenMentorRegistModal = () => useOpenModal(MentorRegistModal);
