import {useOpenMentorRegistModal} from '../../hooks/useOpenModals';

export const MentorRegistSection = ({isMentor}: {isMentor: boolean}) => {
	const openMentorRegistModal = useOpenMentorRegistModal();

	const handleButton = () => {
		openMentorRegistModal();
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
