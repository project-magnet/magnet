import PopupStore from '../../store/PopupStore';
import {MentorRegistPopup} from './MentorRegistPopup';

export const MentorRegistSection = ({isMentor}: {isMentor: boolean}) => {
	const isOpen = PopupStore(state => state.isOpen);
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);

	const handleButton = () => {
		setIsOpenTrue();
	};

	return (
		<>
			{!isMentor ? (
				<>
					{/* 멘토등록 팝업 */}
					{isOpen && <MentorRegistPopup />}
					<section
						onClick={handleButton}
						className="userPageSection interactionPushDown select-none justify-between"
					>
						<span className="textLarge text-additional3">멘토가 아니신가요?</span>
						<span className="textLarge text-secondary">{'>'}</span>
					</section>
				</>
			) : null}
		</>
	);
};
