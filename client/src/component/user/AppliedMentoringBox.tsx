import {useState} from 'react';

type appliedMentoringProps = {
	menteeId: number;
	memberId: number;
	message: string;
	schedule: string;
	paymentKey: string;
	email: string;
	mentoringId: number;
	title: string;
	content: string;
	pay: string;
	participants: number;
	category: string;
};
export const AppliedMentoringBox = ({mentoringDto}: {mentoringDto: appliedMentoringProps}) => {
	const [isClicked, setIsClicked] = useState(false);
	// 버튼 클릭 시 mentoring 데이터 가져오기
	const handleClick = async () => {
		setIsClicked(!isClicked); // isClicked 상태 토글
	};

	return (
		<div className="interactionPushDown flexCol w-full rounded-lg border">
			<button className={` textSmall flexCenter w-full justify-between p-5`} onClick={handleClick}>
				<div className="flexCol items-start gap-3">
					<span className="font-PartialSansKR_Regular">{mentoringDto.category}</span>
					<span>{mentoringDto.title}</span>
				</div>
				<i className={`ri-arrow-drop-${isClicked ? 'down' : 'right'}-line ri-3x`} />
				{/* 버튼 아이콘 변경 */}
			</button>

			{isClicked && mentoringDto && (
				<div className={`textSmall flexCol animate-fadeIn gap-3 p-5 pt-0 `}>
					<div>
						<p className="textBase font-black">멘토</p>
						<span className="text-secondary">데이터 준비중입니다!{/* 데이터 필요함 */}</span>
					</div>
					<div>
						<p className="textBase font-black">멘토링 일정</p>
						<span className="text-secondary">{mentoringDto.schedule}</span>
					</div>
					<div>
						<p className="textBase font-black">결제 금액</p>
						<span className="text-secondary">{mentoringDto.pay}원</span>
					</div>
					<div>
						<p className="textBase font-black">연락가능한 이메일</p>
						<span className="text-secondary">{mentoringDto.email}</span>
					</div>
					<div>
						<p className="textBase font-black">연락가능한 전화번호</p>
						<span className="text-secondary">데이터 준비중입니다!{/* 데이터 필요함 */}</span>
					</div>
					<div>
						<p className="textBase font-black">멘토에게 전달사항</p>
						<span className="text-secondary">{mentoringDto.message}</span>
					</div>
				</div>
			)}
		</div>
	);
};
