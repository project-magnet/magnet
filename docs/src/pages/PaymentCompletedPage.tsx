import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const PaymentCompletedPage = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [fetchingReady, setFetchingReady] = useState(false);
	const [SearchParams, setSearchParams] = useSearchParams();

	const paymentKey = SearchParams.get('paymentKey'),
		orderId = SearchParams.get('orderId'),
		amount = SearchParams.get('amount');

	useEffect(() => {
		const authorToken = sessionStorage.getItem('Authorization');
		const refreshToken = sessionStorage.getItem('RefreshToken');
		const baseUrl = process.env.REACT_APP_BASE_URL || 'NO_BASE_URL';
		axios
			.get(
				`${baseUrl}/api/v1/payments/toss/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'ngrok-skip-browser-warning': 'true',
						Authorization: `${authorToken}`,
						RefreshToken: `${refreshToken}`,
					},
				},
			)
			.then(res => setData(res.data.data))
			.then(() => setFetchingReady(true))
			.catch(err => {
				console.log(err);
				navigate('/paymentfailed');
			});
	}, []);

	return (
		<div className=" w-full flexCenter flex-col gap-20 py-14">
			{fetchingReady ? (
				<>
					<section className="flexCol items-center gap-10">
						<i className="ri-calendar-check-line text-green-500 ri-7x" />
						<p className="text-3xl font-semibold">결제 완료</p>
						<p className="text-sm text-slate-400">빠른 시일내에 멘토님의 승인을 알려드릴게요!</p>
						<p>{data}</p>
					</section>
					<Link to="/user" className=" px-6 py-2 buttonStyle">
						<p className="text-sm">나의 일정 보러 가기</p>
					</Link>
				</>
			) : (
				<p className="animate-bounce">서버에 결제 요청중...</p>
			)}
		</div>
	);
};

export default PaymentCompletedPage;
