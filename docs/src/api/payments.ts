import axios from 'axios';
import {MentoringStore} from '../store/MentoringStore';
import {loadTossPayments} from '@tosspayments/payment-sdk';

const clientKey = 'test_ck_yL0qZ4G1VO501X6MlKxY8oWb2MQY';
const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';
const appUrl = process.env.REACT_APP_URL || 'NO_APP_URL';

export const openTossPayment = async () => {
	try {
		const {mentoringId, amount} = MentoringStore.getState();
		const body = {
			payType: 'CARD',
			amount: amount,
			orderName: '포인트 결제',
			yourSuccessUrl: `${appUrl}/paymentcompleted`,
			yourFailUrl: `${appUrl}/paymentfailed`,
			mentoringId: mentoringId,
		};
		console.log('body', body);
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');

		const res = await axios.post(`${baseUrl}/api/v1/payments/toss`, body, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		});
		const data = res.data;
		console.log('res data', data);
		const tossPayments = await loadTossPayments(clientKey);
		tossPayments.requestPayment(data.payType, {
			amount: data.amount,
			orderId: data.orderId,
			orderName: data.orderName,
			customerName: data.customerName,
			successUrl: data.successUrl,
			failUrl: data.failUrl,
			customerEmail: data.customerEmail,
		});
	} catch (error) {
		console.error('토스 결제창 열기 실패', error);
	}
};

type PaymentData = {
	paymentKey: string;
	orderId: string;
	amount: string;
};

export const sendPaymentSuccessToServer = async (paymentData: PaymentData) => {
	try {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const response = await axios.get(
			`${baseUrl}/api/v1/payments/toss/success?paymentKey=${paymentData.paymentKey}&orderId=${paymentData.orderId}&amount=${paymentData.amount}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': 'true',
					Authorization: authorToken,
					RefreshToken: refreshToken,
				},
			},
		);
		console.log('서버에 결제 완료 정보 전송 성공', response);
		return response.data;
	} catch (error) {
		console.error('서버에 결제 완료 정보 전송 실패', error);
	}
};
