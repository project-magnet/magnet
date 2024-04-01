type ScheduleboxProps = {
	menteeId: number;
	memberId: number;
	mentoringId: number;
	message: string;
	schedule: string;
	paymentKey: string;
	email: string;
};

export const MenteeScheduleSection = ({MenteeList}: {MenteeList: ScheduleboxProps[]}) => {
	return (
		<section className="userPageSection flex-col gap-10">
			<div className="flexCol items-center gap-1">
				<p className="textTitle">내가 신청한 멘토링 일정</p>
				<p className="textSmall text-blue-400">안녕하세요 멘티님! 예약된 일정을 확인해보세요!</p>
			</div>

			{MenteeList.length === 0 ? (
				<p className="flexCenter textLarge h-40">예약한 멘토링이 없습니다!</p>
			) : (
				<div className="flex min-h-72 w-full snap-x gap-10 overflow-x-auto rounded-xl bg-white p-10 shadow-inner shadow-slate-300">
					{MenteeList.map((el, index) => (
						<div className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5">
							<div>
								<p className="mt-1 truncate text-sm text-secondary">{`#${el.schedule}`}</p>
								<p className="mt-1 truncate text-sm text-secondary">{`#${el.email}`}</p>
							</div>
							<div className="h-0.5 w-full border border-dashed" />
							<div className="line-clamp-5">
								<p className="">{el.message}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default MenteeScheduleSection;
