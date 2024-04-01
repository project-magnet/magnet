import React from 'react';
import {openTossPayment} from '../../api/payments';
import {useAddPath} from '../../hooks/useAddPath';
import {LoginPopupStore} from '../../store/LoginPopupStore';

type PaymentButtonProps = {
	type: 'previous' | 'next' | 'payment'; // 버튼의 유형
	pageNumber: number; // 현재 페이지 번호
	disable?: boolean; // 버튼 비활성화 여부
};

const PaymentButton: React.FC<PaymentButtonProps> = ({type, pageNumber, disable}) => {
	const addPath = useAddPath();
	const setLoginPopupIsOpenTrue = LoginPopupStore(state => state.setLoginPopupIsOpenTrue);

	const buttonConfig = {
		next: {
			text: '다음으로',
			handler: () => {
				//세션스토리지에 Authorization이 있으면 다음페이지로 넘어가고 없으면 로그인 팝업을 띄움
				const token = sessionStorage.getItem('Authorization');
				if (token) {
					addPath(`page=${pageNumber + 1}`);
				} else {
					setLoginPopupIsOpenTrue();
				}
			},
			className: 'buttonStylePrimary',
		},
		previous: {
			text: '이전으로',
			handler: () => addPath(`page=${pageNumber - 1}`),
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
