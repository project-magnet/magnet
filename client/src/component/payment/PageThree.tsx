import {MentoringStore} from '../../store/MentoringStore';
import {LodingContainer} from '../common/LoadingContainer';

export const PageThree = () => {
	const {mentoringData} = MentoringStore();
	//세션스토리지에 꺼냄
	const phone = sessionStorage.getItem('phone');
	const email = sessionStorage.getItem('email');
	const message = sessionStorage.getItem('message');

	return mentoringData ? (
		<>
			<div className="flexCol">
				<span className="textBase">멘토링 제목</span>
				<span className="textSmall text-slate-500">{mentoringData.title}</span>
			</div>
			<div className="flexCol">
				<span className="textBase">결제 금액</span>
				<span className="textSmall  text-slate-500">{mentoringData.pay}원</span>
			</div>
			<div className="flexCol">
				<span className="textBase">멘토링 진행 기간</span>
				<span className="textSmall text-slate-500">{mentoringData.period}월</span>
			</div>
			<div className="flexCol">
				<span className="textBase">연락 가능한 연락처</span>
				<span className="textSmall  text-slate-500">{phone}</span>
			</div>
			<div className="flexCol">
				<span className="textBase">연락 가능한 이메일</span>
				<span className="textSmall text-slate-500">{email}</span>
			</div>
			<div className="flexCol">
				<span className="textBase">멘토에게 전달사항</span>
				<span className="textSmall text-slate-500">{message}</span>
			</div>
		</>
	) : (
		<LodingContainer />
	);
};
