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

const Schedulebox = ({props}: {props: ScheduleboxProps}) => {
	const {aboutMe, career, field, task} = props;
	return (
		<div className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5">
			<div>
				<p className="mt-1 truncate text-sm text-secondary">{`#${career}`}</p>
				<p className="mt-1 truncate text-sm text-secondary">{`#${field}`}</p>
				<p className="mt-1 truncate text-sm text-secondary">{`#${task}`}</p>
			</div>
			<div className="h-0.5 w-full border border-dashed" />
			<div className="line-clamp-5">
				<p className="">{aboutMe}</p>
			</div>
		</div>
	);
};

export default Schedulebox;
