import PopupStore from '../../store/PopupStore';
import {MentorRegistPopup} from './MentorRegistPopup';
import {useEffect} from 'react';

export const MentorRegistSection = ({isMentor}: {isMentor: boolean}) => {
	const isOpen = PopupStore(state => state.isOpen);
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);

	const handleButton = () => {
		setIsOpenTrue();
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
		} else {
			document.body.style.overflow = 'auto'; // 페이지 스크롤 허용
		}
		return () => {
			document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
		};
	}, [isOpen]);

	return (
		<>
			{!isMentor ? (
				<>
					{/* 멘토등록 팝업 */}
					{isOpen && <MentorRegistPopup />}
					<section className="userPageSection flex-col justify-between gap-10  bg-gradient-to-r  from-additional2 to-additional3 py-10 lg:flex-row">
						<div>
							<p className="mb-2 text-4xl font-semibold">멘토 등록하기</p>
							<p className="text-sm ">멘토가 되어서 멘토링을 직접 개설해 보세요!</p>
						</div>
						<button className="buttonStyle" onClick={handleButton}>
							<p className="font-medium ">간단하게 등록하기</p>
						</button>
					</section>
				</>
			) : null}
		</>
	);
};
