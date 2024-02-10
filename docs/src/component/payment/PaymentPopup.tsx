import 'remixicon/fonts/remixicon.css';
import PaymentInput from './PaymentInput';
import PaymentButton from './PaymentButton';
import {useEffect, useState} from 'react';
import PopupStore from '../../store/PopupStore';
import {useLocation, useNavigate} from 'react-router-dom';

// page는 urlparameter로 받아온다.
const PaymentPopup = () => {
	const setIsOpenFalse = PopupStore(state => state.setIsOpenFalse);
	const [pageNumber, setPageNumber] = useState(1);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const pageParam = searchParams.get('page');

		if (pageParam) {
			setPageNumber(Number(pageParam));
		}
	}, [location.search]);

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
			className="flexCenter size-full fixed bg-opacity-30 bg-black z-20 top-0 "
		>
			<section className="flexCol mt-48 sm:mt-0 pb-32 sm:pb-8 p-8  bg-white size-full sm:w-[500px] rounded-md z-20 gap-5 animate-fadeIn">
				<div className="flex justify-between items-center ">
					<div className="flex gap-3 items-center">
						<p className="text-lg font-semibold">
							{pageNumber === 1 ? '멘토링 소개' : pageNumber === 2 ? '신청하기' : '신청 정보 확인'}
						</p>
						<p className="text-slate-400 text-sm">{`${pageNumber}/3`}</p>
					</div>
					<i
						onClick={handleClick}
						className="ri-close-line text-2xl cursor-pointer  text-slate-400"
					></i>
				</div>
				<div className="flexCol flex-grow gap-5 overflow-y-auto">
					{pageNumber === 1 ? (
						<>
							<div>
								<p className="truncate font-bold text-lg">김브라키오사우루스</p>
								<p className="truncate text-secondary text-sm mt-1">#투썸플레이스</p>
								<p className="truncate text-secondary text-sm mt-1">#프론트엔드</p>
								<p className="truncate text-secondary text-sm mt-1">#23년차 시니어</p>
							</div>
							<p className="font-bold text-2xl">
								[프론트엔드] 23년차 시니어 개발자의 비밀보따리를 풀어보는시간.
							</p>
							<div className="w-full h-[1px] border" />
							<div className="">
								<p>멘토링은 이렇게 진행합니다...</p>
								<ol>
									<li>화상진행 (캠필수!)</li>
									<li>대면진행 (구리역 근처)</li>
								</ol>
								<p>
									<br />
								</p>
								<p>대상은 이렇습니다...</p>
								<ul>
									<li>취준생</li>
									<li>막막한 취준생</li>
									<li>막연한 취준생</li>
								</ul>
								<p>
									<br />
								</p>
								<p>
									약 1시간 진행할 예정입니다. 근데 제가 말이좀 많아서.... 주저리주저리....
									아무내용..... 그냥 채워넣는중....아무내용..... 그냥 채워넣는중....아무내용.....
									그냥 채워넣는중....아무내용..... 그냥 채워넣는중....아무내용.....
									그냥아무내용..... 그냥 채워넣는중....아무내용..... 그냥
									채워넣는중....아무내용..... 그냥 채워넣는중.... 채워넣는중.... 아무내용..... 그냥
									채워넣는중.... 아무내용..... 그냥 채워넣는중.... 아무내용..... 그냥 채워넣는중....
								</p>
							</div>
						</>
					) : pageNumber === 2 ? (
						<>
							<PaymentInput label="스케줄 설정" placeholder="날짜 및 시간 선택" />
							<PaymentInput label="실명" placeholder="실명을 입력해 주세요" />
							<PaymentInput
								label="연락 가능한 연락처"
								placeholder="수락 시에만 멘토에게 공개됩니다"
							/>
							<PaymentInput
								label="연락 가능한 이메일 "
								placeholder="수락 시에만 멘토에게 공개됩니다"
							/>
							<PaymentInput
								label="멘토에게 전달사항"
								placeholder="멘토링을 시작하기 전, 전달할 내용을 상세하게 남겨주실 수록 더욱 의미있는 시간을 가질 수 있습니다 :)"
							/>
						</>
					) : (
						<>
							<div>
								<span>멘토</span>
								<span className="ml-3 text-slate-500 text-sm">김브라키오사우루스</span>
							</div>
							<div>
								<span>멘티</span>
								<span className="ml-3 text-slate-500 text-sm">박실명</span>
							</div>
							<div>
								<span>일정</span>
								<span className="ml-3 text-slate-500 text-sm">2024.01.18 (목), 21:00~22:00</span>
							</div>
							<div>
								<span>연락처</span>
								<span className="ml-3 text-slate-500 text-sm">010-2321-8346</span>
							</div>
							<div>
								<span>이메일</span>
								<span className="ml-3 text-slate-500 text-sm">qpwoei01234@gmail.com</span>
							</div>
							<div>
								<span>메시지</span>
								<span className="ml-3 text-slate-500 text-sm">취업 안되면 고소함.</span>
							</div>
						</>
					)}
				</div>

				<div className="flex justify-end gap-3">
					{pageNumber === 1 ? (
						<PaymentButton pageNumber={pageNumber} type="next" />
					) : pageNumber === 2 ? (
						<>
							<PaymentButton pageNumber={pageNumber} type="previous" />
							<PaymentButton pageNumber={pageNumber} type="next" />
						</>
					) : (
						<>
							<PaymentButton pageNumber={pageNumber} type="previous" />
							<PaymentButton pageNumber={pageNumber} type="payment" />
						</>
					)}
				</div>
			</section>
		</div>
	);
};

export default PaymentPopup;
