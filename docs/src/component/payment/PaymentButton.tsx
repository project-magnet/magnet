import React from 'react';
import {useNavigate} from 'react-router-dom';
import {openTossPayments} from '../../utils/payments/openTossPayments';

type PaymentButtonProps = {
	type: 'previous' | 'next' | 'payment';
	pageNumber: number;
	disable?: boolean;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({type, pageNumber, disable}) => {
	const navigate = useNavigate();

	const buttonConfig = {
		next: {
			text: '다음으로',
			handler: () => navigate(`?page=${pageNumber + 1}`),
			className: 'bg-additional2 text-white', // Add className for '다음으로' type
		},
		previous: {
			text: '이전으로',
			handler: () => navigate(`?page=${pageNumber - 1}`),
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
			className={`buttonStyle flexCenter h-10 w-24  ${className} ${disable && 'pointer-events-none opacity-50'}`}
		>
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default PaymentButton;
