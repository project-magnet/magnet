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
	mentoringDtoList: any[];
};

export const MentorScheduleSection = ({mentorList}: {mentorList: ScheduleboxProps[]}) => {
	return (
		<section className="userPageSection flexCol gap-10">
			<div className="flexCol items-center gap-1">
				<p className="textTitle">나의 멘토링 예약 일정</p>
				<p className="textSmall text-additional2">
					안녕하세요 멘토님! 멘티의 신청여부를 확인하세요!
				</p>
			</div>

			{mentorList.length === 0 ? (
				<p className="flexCenter textLarge h-40">개설한 멘토링이 없습니다!</p>
			) : (
				<div className="flex min-h-72 w-full snap-x gap-10 overflow-x-auto rounded-xl bg-white p-10 shadow-inner shadow-slate-300">
					{mentorList.map((el, index) => (
						<div className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5">
							<div>
								<p className="mt-1 truncate text-sm text-secondary">{`#${el.career}`}</p>
								<p className="mt-1 truncate text-sm text-secondary">{`#${el.field}`}</p>
								<p className="mt-1 truncate text-sm text-secondary">{`#${el.task}`}</p>
							</div>
							<div className="h-0.5 w-full border border-dashed" />
							<div className="line-clamp-5">
								<p className="">{el.aboutMe}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default MentorScheduleSection;
