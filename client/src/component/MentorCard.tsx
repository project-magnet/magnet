import {useNavigate} from 'react-router-dom';
import {Content} from '../api/mentoring';
import {useOpenPaymentModal} from '../hooks/useOpenModals';

const MentorCard = ({mentoring}: {mentoring: Content}) => {
	const {mentorName, mentoringId, career, field, task, title, category} = mentoring;
	const navigate = useNavigate();
	const openPaymentModal = useOpenPaymentModal();

	const handleClick = () => {
		navigate(`/mentorlist?mentoringid=${mentoringId}`);
		openPaymentModal();
	};

	return (
		<div
			onClick={handleClick}
			className="flexCol interactionPushDown h-36 w-11/12  animate-fadeIn gap-5 divide-y  
			 rounded-lg bg-background p-5 shadow-lg sm:h-60 sm:w-96"
		>
			<div className="textBase flexCol w-full flex-grow items-start gap-2">
				<p className="truncate font-PartialSansKR_Regular">{`${category}`}</p>
				<div className="textBase line-clamp-2 h-3/5">{title}</div>
			</div>

			<div className="flexCol items-start gap-1 pt-2">
				<div className="textSmall flex gap-2 text-secondary *:flex *:gap-1 sm:flex-col">
					<div>
						<i className="ri-user-line" />
						<p className="truncate font-bold text-additional3">{mentorName}</p>
					</div>

					<div>
						<i className="ri-building-line" />
						<p className="truncate">{`${task}`}</p>
					</div>
					<div>
						<i className="ri-bar-chart-2-line " />
						<p className="truncate">{`${career}`}</p>
					</div>
					<div>
						<i className="ri-walk-line " />
						<p className="truncatey ">{`${field}`} 분야</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MentorCard;
