import React from 'react';
import {useNavigate} from 'react-router-dom';
import {openTossPayments} from '../../utils/payments/openTossPayments';

type PaymentButtonProps = {
	type: 'previous' | 'next' | 'payment';
	pageNumber: number;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({type, pageNumber}) => {
	const navigate = useNavigate();

	const buttonConfig = {
		next: {
			text: '다음으로',
			handler: () => navigate(`?page=${pageNumber + 1}`),
		},
		previous: {
			text: '이전으로',
			handler: () => navigate(`?page=${pageNumber - 1}`),
		},
		payment: {
			text: '결제하기',
			handler: () => openTossPayments(),
		},
	};

	const {text, handler} = buttonConfig[type];

	return (
		<div onClick={handler} className="buttonStyle w-24 h-10 flexCenter bg-slate-50">
			<p className="font- text-sm">{text}</p>
		</div>
	);
};

export default PaymentButton;
