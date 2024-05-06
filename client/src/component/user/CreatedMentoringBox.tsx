import {getMenteeList} from '../../api/mentee';
import {useOpenMenteeListModal} from '../../hooks/useOpenModals';
import {useState} from 'react';

type MentoringDto = {
	id: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};

type MenteeData = {
	menteeId: number;
	menteeNickName: string;
	schedule: string;
	phone: any;
	email: string;
};

export const CreatedMentoringBox = ({mentoringDto}: {mentoringDto: MentoringDto}) => {
	const openMenteeListModal = useOpenMenteeListModal(); // 멘티 리스트 모달 열기

	// 버튼 클릭 시 mentoring 데이터 가져오기
	const handleClick = async () => {
		try {
			const data = await getMenteeList(mentoringDto.id); // mentoring 데이터 가져오기
			openMenteeListModal(data); // 멘티 리스트 모달 열기
		} catch (error) {
			console.error('getMentoring 호출 중 오류 발생:', error);
		}
	};

	return (
		<div className="interactionPushDown flexCol w-full rounded-lg border">
			<button className={` textSmall flexCenter w-full justify-between p-5`} onClick={handleClick}>
				<div className="flexCol items-start gap-3">
					<span className="font-PartialSansKR_Regular">{mentoringDto.category}</span>
					<span>{mentoringDto.title}</span>
				</div>
				<i className={`ri-list-check ri-2x animate-pulse`} />
			</button>
		</div>
	);
};

export const MenteeListModal = ({menteeList}: {menteeList: MenteeData[]}) => {
	return (
		<div className="flexCol h-96 w-full gap-3 overflow-scroll">
			<span className="font-PartialSansKR_Regular"> 멘티 리스트 </span>
			{menteeList.map((mentee, index) => (
				<MennteeBox mentee={mentee} key={index} />
			))}
		</div>
	);
};

const MennteeBox = ({mentee, key}: {mentee: MenteeData; key: number}) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<div
			key={key}
			className={`interactionPushDown flexCol w-full gap-5 rounded-lg border p-3`}
			onClick={() => setIsShow(!isShow)}
		>
			<div className="flexCenter w-full justify-between">
				<span className="textLarge">{mentee.menteeNickName}</span>
				<i className={`ri-arrow-drop-${isShow ? 'down' : 'right'}-line ri-2x`} />
			</div>

			{isShow && (
				<div className="flexCol textSmall animate-fadeIn gap-3">
					<div>
						<p className="textBase font-black">Phone</p>
						<span className="text-secondary">{mentee.phone || '관리자에게 문의해주세요!'}</span>
					</div>
					<div>
						<p className="textBase font-black">Email</p>
						<span className="text-secondary">{mentee.email || '관리자에게 문의해주세요!'}</span>
					</div>
				</div>
			)}
		</div>
	);
};
