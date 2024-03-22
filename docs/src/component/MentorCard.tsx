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
			className="flex h-40 animate-fadeIn cursor-pointer gap-5 bg-background p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
		>
			<div className="h-full w-52">
				<p className="mb-1 truncate text-additional3">{`${category}`}</p>
				<div className="line-clamp-4 text-sm">{title}</div>
			</div>

			<div className="h-full border border-dashed" />

			<div className="flexCol h-full w-32">
				<p className="mb-2 truncate font-bold">{mentorName}</p>
				<div className="flex gap-1">
					<i className="ri-building-line text-secondary" />
					<p className="mt-1 truncate text-xs text-additional3">{`${task}`}</p>
				</div>
				<div className="flex gap-1">
					<i className="ri-bar-chart-2-line text-secondary" />
					<p className="mt-1 truncate text-xs text-secondary">{`${career}`}</p>
				</div>
				<div className="flex gap-1">
					<i className="ri-walk-line text-secondary" />
					<p className="mt-1 truncate text-xs text-secondary">{`${field}`} 직무</p>
				</div>
			</div>
		</div>
	);
};

export default MentorCard;
