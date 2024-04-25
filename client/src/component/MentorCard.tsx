import ModalStore from '../store/ModalStore';
import {useNavigate} from 'react-router-dom';
import {Content} from '../api/mentoring';
import PaymentPopup from './payment/PaymentPopup';

const MentorCard = ({mentoring}: {mentoring: Content}) => {
	const {setIsOpenTure, setChildren} = ModalStore();
	const {mentorName, mentoringId, career, field, task, title, category} = mentoring;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/mentorlist?mentoringid=${mentoringId}`);
		setChildren(<PaymentPopup />);
		setIsOpenTure();
	};

	return (
		<div
			onClick={handleClick}
			className="flexCol interactionPushDown h-52 w-11/12  animate-fadeIn  gap-5 divide-y  
			 rounded-lg bg-background p-5 shadow-md sm:h-60 sm:w-96"
		>
			<div className="textBase flexCol w-full flex-grow items-start gap-2">
				<p className="truncate font-PartialSansKR_Regular">{`${category}`}</p>
				<div className="line-clamp-2 h-3/5 font-light">{title}</div>
			</div>

			<div className="flexCol textSmall w-full items-start gap-1 pt-2">
				<p className="textBase truncate font-bold text-black">{mentorName}</p>
				<div className="flex gap-1 text-secondary *:flex *:gap-1 sm:flex-col">
					<div>
						<i className="ri-building-line" />
						<p className="truncate text-additional3 ">{`${task}`}</p>
					</div>
					<div>
						<i className="ri-bar-chart-2-line " />
						<p className="truncate">{`${career}`}</p>
					</div>
					<div>
						<i className="ri-walk-line " />
						<p className="truncatey ">{`${field}`} 직무</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MentorCard;
