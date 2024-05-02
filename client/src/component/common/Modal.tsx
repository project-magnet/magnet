import ReactDOM from 'react-dom';
import ModalStore from '../../store/ModalStore';
import {LogoTickle} from './LogoTickle';
import {useEffect} from 'react';

export const Modal = () => {
	const {modalChildren, closeModal} = ModalStore();

	// ESC 키를 누르면 모달이 닫히도록 합니다.
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [closeModal]);

	// 모달이 열릴 때 body에 overflow: hidden을 추가합니다.
	useEffect(() => {
		modalChildren
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset');
	}, [modalChildren]);

	return modalChildren
		? ReactDOM.createPortal(
				<div
					onClick={closeModal}
					className="flexCenter fixed top-0 z-50 size-full animate-fadeIn bg-black bg-opacity-50 backdrop-blur-sm"
				>
					<section onClick={e => e.stopPropagation()} className="modalStyle relative">
						<PopupCloseButton handleClick={closeModal} />
						<LogoTickle word="MAGNET" />
						{modalChildren}
					</section>
				</div>,
				document.body,
			)
		: null;
};

const PopupCloseButton = ({handleClick}: {handleClick: React.MouseEventHandler<HTMLElement>}) => {
	return (
		<div className="absolute right-1 top-1">
			<i
				onClick={handleClick}
				className="ri-close-line cursor-pointer text-3xl text-slate-400 transition-colors duration-300 hover:text-black"
			></i>
		</div>
	);
};
