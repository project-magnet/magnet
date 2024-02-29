import React from 'react';
import {openTossPayments} from '../../utils/payments/openTossPayments';
import {useAddPath} from '../../hooks/useAddPath';

type PaymentButtonProps = {
	type: 'previous' | 'next' | 'payment'; // 버튼의 유형
	pageNumber: number; // 현재 페이지 번호
	disable?: boolean; // 버튼 비활성화 여부
};

const PaymentButton: React.FC<PaymentButtonProps> = ({type, pageNumber, disable}) => {
	const addPath = useAddPath();

	const buttonConfig = {
		next: {
			text: '다음으로',
			handler: () => addPath(`page=${pageNumber + 1}`),
			className: 'bg-additional2 text-white',
		},
		previous: {
			text: '이전으로',
			handler: () => addPath(`page=${pageNumber - 1}`),
			className: 'bg-white text-black',
		},
		payment: {
			text: '결제하기',
			handler: () => openTossPayments(),
			className: 'bg-blue-400 text-white',
		},
	};

	const {text, handler, className} = buttonConfig[type];

	return (
		<div
			onClick={handler}
			className={`buttonStyle flexCenter h-10 w-24 
			${className} ${disable && 'pointer-events-none opacity-50'}`}
		>
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default PaymentButton;
