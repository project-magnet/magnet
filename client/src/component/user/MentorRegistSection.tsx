import ModalStore from '../../store/ModalStore';
import {MentorRegistPopup} from './MentorRegistPopup';

export const MentorRegistSection = ({isMentor}: {isMentor: boolean}) => {
	const {setIsOpenTure, setChildren} = ModalStore();

	const handleButton = () => {
		setChildren(<MentorRegistPopup />);
		setIsOpenTure();
	};

	return !isMentor ? (
		<section
			onClick={handleButton}
			className="userPageSection interactionPushDown flex select-none justify-between"
		>
			<span className="textLarge text-additional3">멘토가 아니신가요?</span>
			<span className="textLarge text-secondary">{'>'}</span>
		</section>
	) : null;
};
