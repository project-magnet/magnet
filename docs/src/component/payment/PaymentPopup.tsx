import 'remixicon/fonts/remixicon.css';
import PaymentInput from './PaymentInput';
import PaymentButton from './PaymentButton';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {useLocation, useNavigate} from 'react-router-dom';
import {getMentoring, getMentoringData} from '../../api/mentoring';
import {LodingContainer} from '../common/LoadingContainer';

// page는 urlparameter로 받아온다.
const PaymentPopup = () => {
	const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [mentoringData, setMentoringData] = useState<getMentoringData | null>(null);
	const [allInputFilled, setAllInputFilled] = useState<boolean>(false);
	const [menteeName, setMenteeName] = useState<string>('');
	const [menteePhone, setMenteePhone] = useState<string>('');
	const [menteeEmail, setMenteeEmail] = useState<string>('');
	const [menteeMessage, setMenteeMessage] = useState<string>('');
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const pageParam = searchParams.get('page');

		if (pageParam) {
			setPageNumber(Number(pageParam));
		}
	}, [location.search]);

	useEffect(() => {
		setAllInputFilled(
			(menteeName && menteePhone && menteeEmail && menteeMessage) === '' ? false : true,
		);
	}, [menteeName, menteePhone, menteeEmail, menteeMessage]);

	useEffect(() => {
		const fetchMentoringData = async () => {
			try {
				const searchParams = new URLSearchParams(location.search);
				const mentoringid = searchParams.get('mentoringid');
				const data: getMentoringData = await getMentoring(mentoringid ? Number(mentoringid) : 0);
				setMentoringData(data);
			} catch (error) {
				console.error('멘토링 정보를 불러오는 동안 오류가 발생했습니다:', error);
				setMentoringData({
					mentoringId: 0,
					title: '데이터를 불러오지 못했습니다',
					content: '이러고 있지말고 빨리 고쳐러 가는게 어떤가요?',
					pay: '30000',
					period: ' 2024/3월 ',
					participants: 12,
					category: '흑흑',
					mentorId: 0,
					career: '아앗',
					field: '서버가',
					task: '이상하다',
					email: '이메일',
					phone: '전화번호',
					aboutMe: '어바웃 미',
					github: '깃헙',
				});
			}
		};
		fetchMentoringData();
	}, []);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 팝업 영역 자체를 클릭한 경우에만 팝업을 닫습니다.
		if (e.target === e.currentTarget) {
			setIsOpenFalse();
			navigate(``);
		}
	};

	return (
		<div
			onClick={handleClick}
			className="flexCenter fixed top-0 z-20 size-full bg-black bg-opacity-30 "
		>
			<section className="flexCol z-20 mt-48 size-full gap-5 rounded-md  bg-white p-8 pb-32 sm:mt-0 sm:w-[500px] sm:pb-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<p className="text-lg font-semibold">
							{pageNumber === 1 ? '멘토링 소개' : pageNumber === 2 ? '신청하기' : '신청 정보 확인'}
						</p>
						<p className="text-sm text-slate-400">{`${pageNumber}/3`}</p>
					</div>
					<i
						onClick={handleClick}
						className="ri-close-line cursor-pointer text-2xl  text-slate-400"
					></i>
				</div>
				<div className="flexCol flex-grow animate-fadeIn gap-5  overflow-y-auto">
					{mentoringData ? (
						<>
							{pageNumber === 1 ? (
								<>
									<div>
										<p className="truncate text-lg font-bold">멘토 이름 추가해야함</p>
										<p className="mt-1 truncate text-sm text-secondary">#{mentoringData.career}</p>
										<p className="mt-1 truncate text-sm text-secondary">#{mentoringData.field}</p>
										<p className="mt-1 truncate text-sm text-secondary">#{mentoringData.task}</p>
									</div>
									<div className="h-[1px] w-full border border-dashed" />
									<p className="text-2xl font-bold">
										<p className="text-lg text-secondary">#{mentoringData.category}</p>
										{mentoringData.title}
									</p>
									<p className="text-sm">{mentoringData.content}</p>
								</>
							) : pageNumber === 2 ? (
								<>
									<PaymentInput
										label="실명"
										placeholder="실명을 입력해 주세요"
										data={menteeName}
										setData={setMenteeName}
									/>
									<PaymentInput
										label="연락 가능한 연락처"
										placeholder="연락 가능한 연락처를 입력해 주세요"
										data={menteePhone}
										setData={setMenteePhone}
									/>
									<PaymentInput
										label="연락 가능한 이메일 "
										placeholder="연락 가능한 이메일을 입력해 주세요"
										data={menteeEmail}
										setData={setMenteeEmail}
									/>
									<PaymentInput
										label="멘토에게 전달사항"
										placeholder="상세하게 남겨주실 수록 더욱 의미있는 시간을 가질 수 있습니다 :)"
										data={menteeMessage}
										setData={setMenteeMessage}
									/>
								</>
							) : pageNumber === 3 ? (
								<>
									<div>
										<span>멘토링명</span>
										<span className="ml-3 text-sm text-slate-500">{mentoringData.title}</span>
									</div>
									<div>
										<span>멘토링 가격</span>
										<span className="ml-3 text-sm text-slate-500">{mentoringData.pay}원</span>
									</div>

									<div>
										<span>멘티 실명</span>
										<span className="ml-3 text-sm text-slate-500">{menteeName}</span>
									</div>
									<div>
										<span>연락처</span>
										<span className="ml-3 text-sm text-slate-500">{menteePhone}</span>
									</div>
									<div>
										<span>이메일</span>
										<span className="ml-3 text-sm text-slate-500">{menteeEmail}</span>
									</div>
									<div>
										<span>메시지</span>
										<span className="ml-3 text-sm text-slate-500">{menteeMessage}</span>
									</div>
								</>
							) : (
								<></>
							)}
						</>
					) : (
						<LodingContainer />
					)}
				</div>

				<div className="flex justify-end gap-3">
					{pageNumber === 1 && mentoringData ? (
						<div className="flexCenter w-full justify-between">
							{mentoringData && (
								<div className="text-sm">
									<p>멘토링 1회: {mentoringData.pay}원</p>
									<p>진행기간: {mentoringData.period}</p>
								</div>
							)}
							<PaymentButton pageNumber={pageNumber} type="next" />
						</div>
					) : pageNumber === 2 ? (
						<>
							<PaymentButton pageNumber={pageNumber} type="previous" />
							<PaymentButton pageNumber={pageNumber} type="next" disable={!allInputFilled} />
						</>
					) : pageNumber === 3 ? (
						<>
							<PaymentButton pageNumber={pageNumber} type="previous" />
							<PaymentButton pageNumber={pageNumber} type="payment" />
						</>
					) : (
						<></>
					)}
				</div>
			</section>
		</div>
	);
};

export default PaymentPopup;
