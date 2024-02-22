import PopupStore from '../store/PopupStore';
import {useNavigate} from 'react-router-dom';
import {Content} from '../api/mentoring';

const MentorCard = ({mentoring}: {mentoring: Content}) => {
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);
	const {mentorName, mentoringId, career, field, task, title, category} = mentoring;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/mentorlist?mentoringid=${mentoringId}`);
		setIsOpenTrue();
	};

	return (
		<div
			onClick={handleClick}
			className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5"
		>
			<div>
				<p className="truncate text-xl font-bold">{mentorName}</p>
				{[career, field, task].map(el => (
					<p className="mt-1 truncate text-sm text-secondary">{`#${el}`}</p>
				))}
			</div>
			<div className="h-0.5 w-full border border-dashed" />
			<div className="line-clamp-5">
				<p className="text-sm text-secondary">#{category}</p>
				<p className="">{title}</p>
			</div>
		</div>
	);
};

export default MentorCard;
