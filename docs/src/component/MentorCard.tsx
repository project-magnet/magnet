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
			className="flexCol w-full animate-fadeIn cursor-pointer gap-5 bg-background p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg sm:h-40 sm:w-fit sm:flex-row"
		>
			<div className="h-full flex-grow text-2xs sm:w-52 sm:text-sm">
				<p className="mb-2 truncate font-PartialSansKR_Regular">{`${category}`}</p>
				<div className="line-clamp-4">{title}</div>
			</div>

			<div className="h-full border border-dashed" />

			<div className="flexCol h-full sm:w-32 ">
				<p className="mb-2 truncate text-xs font-black sm:text-sm">{mentorName}</p>
				<div className="flex gap-1">
					<i className="ri-building-line text-secondary" />
					<p className="mt-1 truncate text-2xs text-additional3 sm:text-xs">{`${task}`}</p>
				</div>
				<div className="flex gap-1">
					<i className="ri-bar-chart-2-line text-secondary" />
					<p className="mt-1 truncate text-2xs text-secondary sm:text-xs">{`${career}`}</p>
				</div>
				<div className="flex gap-1">
					<i className="ri-walk-line text-secondary" />
					<p className="mt-1 truncate text-2xs text-secondary sm:text-xs">{`${field}`} 직무</p>
				</div>
			</div>
		</div>
	);
};

export default MentorCard;
