import PopupStore from '../store/PopupStore';

interface MyComponentProps {
	data: {
		title: string;
		mentorName: string;
		career: string;
		field: string;
		task: string;
	};
}

const MentorCard = (data: MyComponentProps) => {
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
	const {mentorName, career, field, task, title} = data.data;

	const handleClick = () => {
		setIsOpenTrue();
	};

	return (
		<div
			onClick={handleClick}
			className="p-5 buttonStyle size-72 cursor-pointer bg-background flexCol gap-5 animate-fadeIn"
		>
			<div>
				<p className="truncate font-bold text-xl">{mentorName}</p>
				{[career, field, task].map(el => (
					<p className="truncate text-secondary text-sm mt-1">{`#${el}`}</p>
				))}
			</div>
			<div className="line-clamp-5">
				<p className="">{title}</p>
			</div>
		</div>
	);
};

export default MentorCard;
