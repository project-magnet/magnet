import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {createMentee} from '../api/mentee';
import {sendPaymentSuccessToServer} from '../api/payments';
import {LodingContainer} from '../component/common/LoadingContainer';

const PaymentCompletedPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const fetchPaymentData = async () => {
			try {
				const paymentKey = searchParams.get('paymentKey');
				const orderId = searchParams.get('orderId');
				const amount = searchParams.get('amount');

				if (!paymentKey || !orderId || !amount) {
					throw new Error('결제 관련 데이터가 올바르지 않습니다.');
				}

				await sendPaymentSuccessToServer({paymentKey, orderId, amount});

				const {
					mentoringId = 0,
					schedule = '',
					phone = '',
					message = '',
					email = '',
				} = sessionStorage;

				const menteeData = {
					mentoringId: Number(mentoringId) || 0,
					schedule,
					phone,
					message,
					paymentKey,
					email,
				};

				console.log('menteeData', menteeData);
				await createMentee(menteeData);

				sessionStorage.removeItem('mentoringId');
				sessionStorage.removeItem('schedule');
				sessionStorage.removeItem('phone');
				sessionStorage.removeItem('message');
				sessionStorage.removeItem('email');
				sessionStorage.removeItem('amount');

				setIsLoading(false);
			} catch (error) {
				console.error('PaymentCompletedPage.tsx에서 오류 발생:', error);
				navigate('/paymentfailed');
			}
		};

		fetchPaymentData();
	}, [navigate, searchParams]);

	return (
		<div className="flexCenter w-full flex-col gap-20 py-14">
			{isLoading ? (
				<LodingContainer />
			) : (
				<>
					<section className="flexCol items-center gap-10">
						<i className="ri-calendar-check-line ri-7x text-green-500" />
						<p className="text-3xl font-semibold">결제 완료</p>
						<p className="text-sm text-slate-400">빠른 시일 내에 멘토님의 승인을 알려드릴게요!</p>
					</section>
					<button onClick={() => navigate('/user')} className="buttonStyle px-6 py-2">
						<p className="text-sm">나의 일정 보러 가기</p>
					</button>
				</>
			)}
		</div>
	);
};

export default PaymentCompletedPage;
