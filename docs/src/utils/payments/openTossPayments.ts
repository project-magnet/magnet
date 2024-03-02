import {loadTossPayments} from '@tosspayments/payment-sdk';
import axios from 'axios';
import {MentoringStore} from '../../store/MentoringStore';
import {MenteeStore} from '../../store/MenteeStore';

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY || 'NO_CLIENT_KEY';
const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';
const appUrl = process.env.REACT_APP_URL || 'NO_APP_URL';

export const openTossPayments = () => {
	const {mentoringId, schedule, amount} = MentoringStore();
	const {phone, message} = MenteeStore();
	const body = {
		payType: 'CARD',
		amount: amount,
		orderName: '포인트 결제',
		yourSuccessUrl: `${appUrl}/paymentcompleted`,
		yourFailUrl: `${appUrl}/paymentfailed`,
		mentoringId: mentoringId,
		phone: phone,
		message: message,
		schedule: schedule,
	};
	const authorToken = sessionStorage.getItem('Authorization');
	const refreshToken = sessionStorage.getItem('RefreshToken');

	axios
		.post(`${baseUrl}/api/v1/payments/toss`, body, {
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 'true',
				Authorization: `${authorToken}`,
				RefreshToken: `${refreshToken}`,
			},
		})
		.then(res => {
			console.log(res.data);
			const data = res.data;

			loadTossPayments(clientKey).then(tossPayments => {
				// ------ 결제창 띄우기 ------
				tossPayments
					.requestPayment(data.payType, {
						// 결제수단 파라미터
						// 결제 정보 파라미터
						// 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
						// https://docs.tosspayments.com/reference/js-sdk
						amount: data.amount, // 결제 금액
						orderId: data.orderId, // 각 서버에서 정한 고유한 주문 아이디
						orderName: data.orderName, // 상품명
						customerName: data.customerName,
						successUrl: data.successUrl,
						failUrl: data.failUrl,
						customerEmail: data.customerEmail,
					})
					// ------ 결제창을 띄울 수 없는 에러 처리 ------
					// 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
					// 결제창에서 발생할 수 있는 에러를 확인하세요.
					// https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
					.catch(function (error) {
						if (error.code === 'USER_CANCEL') {
							// 결제 고객이 결제창을 닫았을 때 에러 처리
						} else if (error.code === 'INVALID_CARD_COMPANY') {
							// 유효하지 않은 카드 코드에 대한 에러 처리
						}
					});
			});
		});
};
