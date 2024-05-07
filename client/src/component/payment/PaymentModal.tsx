import PaymentButton from './PaymentButton';
import {useEffect, useState} from 'react';
import {PageOne} from './PageOne';
import {PageTwo} from './PageTwo';
import {PageThree} from './PageThree';
import {getMentoring, getMentoringData} from '../../api/mentoring';
import {useLocation} from 'react-router-dom';
import {MentoringStore} from '../../store/MentoringStore';

const PaymentModal = () => {
	// page는 urlparameter로 받아온다.
	const [pageNumber, setPageNumber] = useState<number>(1);
	const location = useLocation();
	const {setMentoringData, mentoringData} = MentoringStore();

	// 멘토링 정보를 불러온다.
	useEffect(() => {
		const fetchMentoringData = async () => {
			try {
				const searchParams = new URLSearchParams(location.search);
				const mentoringid = searchParams.get('mentoringid');
				const data: getMentoringData = await getMentoring(mentoringid ? Number(mentoringid) : 0);
				setMentoringData(data);
			} catch (error) {
				console.error('멘토링 정보를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentoringData();
	}, [location.search, setMentoringData]);

	return (
		<>
			<div className="flexCol w-full flex-grow animate-fadeIn gap-5 overflow-y-auto">
				<>
					{pageNumber === 1 ? (
						<PageOne />
					) : pageNumber === 2 ? (
						<PageTwo />
					) : pageNumber === 3 ? (
						<PageThree />
					) : (
						<>oops! 404</>
					)}
				</>
			</div>

			<div className="flex w-full justify-end">
				{pageNumber === 1 && mentoringData ? (
					<div className="flexCenter w-full justify-between ">
						<MentoringDetails />
						<PaymentButton setPage={setPageNumber} type="next" />
					</div>
				) : pageNumber === 2 ? (
					<>
						<PaymentButton setPage={setPageNumber} type="previous" />
						<PaymentButton setPage={setPageNumber} type="next" />
					</>
				) : pageNumber === 3 ? (
					<>
						<PaymentButton setPage={setPageNumber} type="previous" />
						<PaymentButton setPage={setPageNumber} type="payment" />
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

const MentoringDetails = () => {
	const {mentoringData} = MentoringStore();

	return mentoringData ? (
		<div className="flexCol textSmall gap-1 rounded-3xl bg-slate-100 px-5 py-2">
			<div className=" flex items-center gap-1">
				<i className="ri-money-dollar-circle-line" />
				<p> 1회 : {mentoringData.pay}원</p>
			</div>
			<div className=" flex items-center gap-1">
				<i className="ri-calendar-event-line" />
				<p> 기간 : {mentoringData.period}</p>
			</div>
		</div>
	) : null;
};

export default PaymentModal;
