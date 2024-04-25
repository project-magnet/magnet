import ModalStore from '../../store/ModalStore';
import {PopupCloseButton} from './PopupCloseButton';
import {LogoTickle} from './LogoTickle';

export const Modal = () => {
	const {isOpen, setIsOpenFalse, children} = ModalStore();

	const closeModal = () => {
		setIsOpenFalse();
	};

	return isOpen ? (
		<div
			onClick={closeModal}
			className="flexCenter fixed top-0 z-50 size-full animate-fadeIn bg-black bg-opacity-50 backdrop-blur-sm "
		>
			<section onClick={e => e.stopPropagation()} className="modalStyle relative">
				<PopupCloseButton handleClick={closeModal} />
				<LogoTickle word="MAGNET" />
				{children}
			</section>
		</div>
	) : null;
};
