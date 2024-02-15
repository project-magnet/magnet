import {useEffect} from 'react';
import PopupStore from '../store/PopupStore';

interface MyComponentProps {
	data: {
		mentoringTitle: string;
		mentoringContent: string;
		mentorName: string;
		career: string;
		field: string;
		task: string;
	};
}

const MentorCard = (data: MyComponentProps) => {
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);

	const handleClick = () => {
		setIsOpenTrue();
	};

	return (
		<div
			onClick={handleClick}
			className="p-5 buttonStyle size-72 cursor-pointer bg-background flexCol gap-5"
		>
			<div>
				<p className="truncate font-bold text-xl">{data.data.mentorName}</p>
				<p className="truncate text-secondary text-sm mt-1">{`#${data.data.task}`}</p>
				<p className="truncate text-secondary text-sm mt-1">{`#${data.data.field}`}</p>
				<p className="truncate text-secondary text-sm mt-1">{`#${data.data.career}`}</p>
			</div>

			<div className="line-clamp-5">
				<p className="">{data.data.mentoringTitle}</p>
			</div>
		</div>
	);
};

export default MentorCard;
