import React from 'react';
import {openTossPayment} from '../../api/payments';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import {useOpenLoginModal} from '../../hooks/useOpenModals';

type PaymentButtonProps = {
	type: 'previous' | 'next' | 'payment'; // 버튼의 유형
	setPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 번호
	disable?: boolean; // 버튼 비활성화 여부
};

const PaymentButton = ({type, setPage, disable}: PaymentButtonProps) => {
	const openTossPaymentToast = useOpenToastPopup();
	const openLoginModal = useOpenLoginModal();

	const buttonConfig = {
		next: {
			text: '다음으로',
			handler: () => {
				//세션스토리지에 Authorization이 있으면 다음페이지로 넘어가고 없으면 로그인 팝업을 띄움
				const token = sessionStorage.getItem('Authorization');
				if (token) {
					setPage(pre => pre + 1);
				} else {
					openTossPaymentToast({message: '로그인이 필요해요.', type: 'warning'});
					openLoginModal();
				}
			},
			className: 'buttonStylePrimary',
		},
		previous: {
			text: '이전으로',
			handler: () => setPage(pre => pre - 1),
			className: 'activeStyle',
		},
		payment: {
			text: '결제하기',
			handler: () => openTossPayment(),
			className: 'buttonStylePrimary',
		},
	};

	const {text, handler, className} = buttonConfig[type];

	return (
		<button onClick={handler} className={`${className}`} disabled={disable}>
			<p className="textSmall">{text}</p>
		</button>
	);
};

export default PaymentButton;
