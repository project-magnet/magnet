type ScheduleboxProps = {
	mentorId: number;
	mentorName: string;
	career: string;
	field: string;
	task: string;
	email: string;
	phone: string;
	aboutMe: string;
	github: string;
	mentoringDtoList: mentoringDto[];
};
type mentoringDto = {
	id: number;
	title: string;
	content: string;
	pay: string;
	period: string;
	participants: number;
	category: string;
};

export const MentorScheduleSection = ({mentorList}: {mentorList: ScheduleboxProps[]}) => {
	const mentoringList = mentorList[0].mentoringDtoList;
	return (
		<section className="userPageSection flexCol gap-10">
			<div className="flexCol items-center gap-1">
				<p className="textTitle">개설한 멘토링</p>
				<p className="textSmall text-additional2">
					안녕하세요 멘토님! 멘티의 신청여부를 확인하세요!
				</p>
			</div>

			{mentoringList.length === 0 ? (
				<p className="flexCenter textLarge h-40">개설한 멘토링이 없습니다!</p>
			) : (
				<div className="flex  w-full gap-10  rounded-xl bg-white p-1 shadow-slate-300  sm:p-10">
					{mentoringList.map((el, index) => (
						<button
							key={index}
							className="interactionPushDown textSmall flexCenter w-full justify-between border-b p-5"
						>
							<div className="flexCol items-start gap-3">
								<span className="font-PartialSansKR_Regular">{el.category}</span>
								<span>{el.title}</span>
							</div>
							<p className="textLarge text-secondary">{'>'}</p>
						</button>
					))}
				</div>
			)}
		</section>
	);
};

export default MentorScheduleSection;
