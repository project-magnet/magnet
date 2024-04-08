import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const PaymentFailedPage = () => {
	const countSecond = 10;
	const microsecond = countSecond * 1000;
	const navigate = useNavigate();
	const [count, setCount] = useState(countSecond);

	useEffect(() => {
		const timer = setInterval(() => {
			setCount(prevCount => prevCount - 1);
		}, 1000);

		setTimeout(() => {
			navigate('/');
		}, microsecond);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="flexCenter h-pageRoot">
			<section className="textBase flexCol items-center gap-10">
				<i className="ri-calendar-check-line ri-7x text-red-500" />
				<h1 className="text-3xl font-semibold">결제 실패</h1>
				<p className="text-sm text-slate-400">{count}초 후에 메인 페이지로 이동합니다...</p>
			</section>
		</div>
	);
};

export default PaymentFailedPage;
