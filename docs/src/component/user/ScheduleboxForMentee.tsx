type ScheduleboxProps = {
	menteeId: number;
	memberId: number;
	mentoringId: number;
	message: string;
	schedule: string;
	paymentKey: string;
	email: string;
};

export const ScheduleboxForMentee = ({props}: {props: ScheduleboxProps}) => {
	const {message, schedule, email} = props;
	return (
		<div className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5">
			<div>
				<p className="mt-1 truncate text-sm text-secondary">{`#${schedule}`}</p>
				<p className="mt-1 truncate text-sm text-secondary">{`#${email}`}</p>
			</div>
			<div className="h-0.5 w-full border border-dashed" />
			<div className="line-clamp-5">
				<p className="">{message}</p>
			</div>
		</div>
	);
};

export default ScheduleboxForMentee;
