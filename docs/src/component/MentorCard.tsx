import {useEffect} from 'react';
import PopupStore from '../store/PopupStore';

const MentorCard = () => {
	const setIsOpenTrue = PopupStore(state => state.setIsOpenTure);

	const handleClick = () => {
		setIsOpenTrue();
	};

	return (
		<div
			onClick={handleClick}
			className="p-5 buttonStyle size-72 cursor-pointer bg-background flexCol gap-5"
		>
			<div>
				<p className="truncate font-bold text-xl">김브라키오사우루스</p>
				<p className="truncate text-secondary text-sm mt-1">#투썸플레이스</p>
				<p className="truncate text-secondary text-sm mt-1">#프론트엔드</p>
				<p className="truncate text-secondary text-sm mt-1">#23년차 시니어</p>
			</div>

			<div className="line-clamp-5">
				<p className="">[프론트엔드] 23년차 시니어 개발자의 비밀보따리를 풀어보는시간</p>
			</div>
		</div>
	);
};

export default MentorCard;
