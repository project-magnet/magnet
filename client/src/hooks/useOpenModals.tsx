import ModalStore from '../store/ModalStore';
import {LoginModal} from '../component/auth/LoginModal';
import PaymentModal from '../component/payment/PaymentModal';
import {MentorRegistModal} from '../component/user/MentorRegistModal';
import {MenteeListModal} from '../component/user/CreatedMentoringBox';

// 모달 열기 훅
export const useOpenModal = (ModalComponent: () => JSX.Element) => {
	const {setModalChildren, setModalOpen} = ModalStore();

	return () => {
		setModalChildren(<ModalComponent />);
		setModalOpen();
	};
};

// 로그인 모달 열기
export const useOpenLoginModal = () => useOpenModal(LoginModal);

// 결제 모달 열기
export const useOpenPaymentModal = () => useOpenModal(PaymentModal);

// 멘토 등록 모달 열기
export const useOpenMentorRegistModal = () => useOpenModal(MentorRegistModal);

// 멘티 리스트 모달 열기
type MenteeData = {
	menteeId: number;
	menteeNickName: string;
	schedule: string;
	phone: any;
	email: string;
};

// 보통 자식으로 porps가 없는 컴포넌트는 그냥 컴포넌트 이름만 넣어주면 되지만 props가 있는 경우에는 함수로 감싸서 넣어주어야 한다.
// 특수한 경우이므로 임시로 작성했다. 추후에 수정이 필요할 수 있다.
export const useOpenMenteeListModal = () => {
	const {setModalChildren, setModalOpen} = ModalStore();

	return (menteeData: MenteeData[]) => {
		setModalChildren(<MenteeListModal menteeList={menteeData} />);
		setModalOpen();
	};
};
