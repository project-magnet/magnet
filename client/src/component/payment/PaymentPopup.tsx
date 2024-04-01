import 'remixicon/fonts/remixicon.css';
import PaymentButton from './PaymentButton';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {useLocation, useNavigate} from 'react-router-dom';
import {getMentoring, getMentoringData} from '../../api/mentoring';
import {LodingContainer} from '../common/LoadingContainer';
import {PopupCloseButton} from '../common/PopupCloseButton';
import {CommonInput} from '../input/CommonInput';

const PaymentPopup = () => {
	const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
	const isOpen = PopupStore(state => state.isOpen);
	// page는 urlparameter로 받아온다.
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [mentoringData, setMentoringData] = useState<getMentoringData | null>(null);
	const [allInputFilled, setAllInputFilled] = useState<boolean>(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	// 팝업이 열리면 body의 스크롤을 막는다.
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
		};
	}, [isOpen]);

	// url parameter로 받아온 page를 state에 저장
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const pageParam = searchParams.get('page');

		if (pageParam) {
			setPageNumber(Number(pageParam));
		}
	}, [location.search]);

	// input이 모두 채워졌는지 확인
	useEffect(() => {
		sessionStorage.setItem('phone', phone);
		sessionStorage.setItem('message', message);
		sessionStorage.setItem('email', email);
		setAllInputFilled((phone && message) === '' ? false : true);
	}, [phone, message]);

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
	}, []);

	// 팝업 영역을 클릭했을 때 팝업을 닫습니다.
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
			<section className="flexCol relative z-20 mt-48 size-full gap-5 rounded-md  bg-white p-8 pb-48 sm:mt-0 sm:w-[500px] sm:pb-8">
				<PopupCloseButton handleClick={handleClick} />
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<p className="textLarge">
							{pageNumber === 1 ? '멘토링 소개' : pageNumber === 2 ? '신청하기' : '신청 정보 확인'}
						</p>
						<p className="textSmall text-slate-400">{`${pageNumber}/3`}</p>
					</div>
				</div>
				<div className="flexCol flex-grow animate-fadeIn gap-5  overflow-y-auto">
					{mentoringData ? (
						<>
							{pageNumber === 1 ? (
								<>
									<div className="textSmall flexCol gap-1 text-secondary *:flex *:gap-1">
										<div>
											<i className="ri-building-line" />
											<p className="truncate text-additional3">{`${mentoringData.task}`}</p>
										</div>
										<div>
											<i className="ri-bar-chart-2-line" />
											<p className="runcate">{`${mentoringData.career}`}</p>
										</div>
										<div>
											<i className="ri-walk-line " />
											<p className="truncate">{`${mentoringData.field}`} 직무</p>
										</div>
									</div>
									<div className="h-[1px] w-full border border-dashed" />
									<p className="textLarge font-bold">{mentoringData.title}</p>
									<div
										className="textBase text-pretty"
										dangerouslySetInnerHTML={{__html: mentoringData.content}}
									/>
								</>
							) : pageNumber === 2 ? (
								<>
									<article className="textlarge animate-fadeInMoveDown rounded-xl bg-slate-100 p-5 text-additional3">
										입력에 주의하라는 거대한 안내문구
									</article>
									<CommonInput
										placeholder="연락 가능한 연락처를 입력해 주세요"
										onChange={setPhone}
										value={phone}
										icon="phone-line"
									/>
									<CommonInput
										placeholder="연락 가능한 이메일을 입력해 주세요"
										onChange={setEmail}
										value={email}
										icon="mail-line"
									/>
									<textarea
										className="min-h-52 w-full resize-none rounded-md border-2 p-2 text-sm"
										placeholder="멘토에게 전달사항
										(멘토링 신청 이유, 질문 등)"
										onChange={e => setMessage(e.target.value)}
										value={message}
									></textarea>
								</>
							) : pageNumber === 3 ? (
								<>
									<div>
										<span className="textBase">신청 멘토링명</span>
										<span className="textSmall ml-3 text-slate-500">{mentoringData.title}</span>
									</div>
									<div>
										<span className="textBase">신청 금액</span>
										<span className="textSmall ml-3 text-slate-500">{mentoringData.pay}원</span>
									</div>
									<div>
										<span className="textBase">멘토링 진행 기간</span>
										<span className="textSmall ml-3 text-slate-500">{mentoringData.period}월</span>
									</div>
									<br />
									<div>
										<span className="textBase">연락 가능한 연락처</span>
										<span className="textSmall ml-3 text-slate-500">{phone}</span>
									</div>
									<div>
										<span className="textBase">연락 가능한 이메일</span>
										<span className="textSmall ml-3 text-slate-500">{email}</span>
									</div>
									<div>
										<span className="textBase">멘토에게 전달사항</span>
										<span className="textSmall ml-3 text-slate-500">{message}</span>
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
						<div className="flexCenter w-full justify-between ">
							{mentoringData && (
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
