import {useState} from 'react';
import {getMenteeList} from '../../api/mentee';

type MentoringDto = {
	id: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};

export const CreatedMentoringBox = ({mentoringDto}: {mentoringDto: MentoringDto}) => {
	const [isClicked, setIsClicked] = useState(false);
	const [mentoringData, setMentoringData] = useState<any>(null); // mentoring 데이터 상태

	// 버튼 클릭 시 mentoring 데이터 가져오기
	const handleClick = async () => {
		if (mentoringData === null) {
			try {
				const data = await getMenteeList(mentoringDto.id); // mentoring 데이터 가져오기
				setMentoringData(data); // mentoring 데이터 설정
			} catch (error) {
				console.error('getMentoring 호출 중 오류 발생:', error);
			}
		}
		setIsClicked(!isClicked); // isClicked 상태 토글
	};

	return (
		<div className="flexCol w-full rounded-lg border">
			<button
				className={`interactionPushDown textSmall flexCenter w-full justify-between p-5`}
				onClick={handleClick}
			>
				<div className="flexCol items-start gap-3">
					<span className="font-PartialSansKR_Regular">{mentoringDto.category}</span>
					<span>{mentoringDto.title}</span>
				</div>
				<i className={`ri-arrow-drop-${isClicked ? 'down' : 'right'}-line ri-3x`} />
			</button>
			{isClicked &&
				mentoringData && ( // 버튼이 클릭되었고 mentoring 데이터가 있을 때만 표시
					<div className={`textSmall flexCol gap-3 p-5 pt-0`}>
						{/* mentoring 데이터 표시 */}
						<div>
							<p className="textBase font-black">멘토링 내용</p>
							<div
								className="text-pretty text-secondary "
								dangerouslySetInnerHTML={{__html: mentoringData.content}}
							/>
						</div>
						<div>
							<p className="textBase">가격</p>
							<span className="text-secondary">{mentoringData.pay}</span>
						</div>
						<div>
							<p className="textBase">참여인원</p>
							<span className="text-secondary">{mentoringData.participants}</span>
						</div>
						<div>
							<p className="textBase">기간</p>
							<span className="text-secondary">{mentoringData.period}</span>
						</div>
					</div>
				)}
		</div>
	);
};
