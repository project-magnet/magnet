import React from 'react';
import {Link} from 'react-router-dom';

const MentorCard = () => {
	return (
		<Link to="/mentor">
			<div className="p-5 size-72 boxShadow bg-background flexCol gap-5">
				<div>
					<p className="truncate font-bold text-xl">김브라키오사우루스</p>
					<p className="truncate text-secondary text-sm mt-1">#투썸플레이스</p>
					<p className="truncate text-secondary text-sm mt-1">#프론트엔드</p>
					<p className="truncate text-secondary text-sm mt-1">#23년차 시니어</p>
				</div>

				<div className="text-overflow">
					<p className="text-md ">장기근속의 비밀에 대해서 알려드립니다.</p>
				</div>
			</div>
		</Link>
	);
};

export default MentorCard;
