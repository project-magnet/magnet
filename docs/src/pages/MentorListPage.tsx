import MentorCard from '../component/MentorCard';
import 'remixicon/fonts/remixicon.css';
import PopupStore from '../store/PopupStore';
import {useEffect, useState} from 'react';
import PaymentPopup from '../component/payment/PaymentPopup';

const MentorListPage = () => {
	const [category, setCategory] = useState('전체');
	const categories = [
		{title: '전체', image: <i className="ri-menu-line ri-2x"></i>},
		{title: '개발', image: <i className="ri-window-line ri-2x"></i>},
		{title: '게임 개발', image: <i className="ri-gamepad-line ri-2x"></i>},
		{title: '데이터 과학', image: <i className="ri-line-chart-line  ri-2x"></i>},
		{title: '보안·네트워크', image: <i className="ri-folder-shield-2-line ri-2x"></i>},
		{title: '하드웨어', image: <i className="ri-hard-drive-3-line ri-2x"></i>},
	];
	const isOpen = PopupStore(state => state.isOpen);
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
		<section className="flexCol items-center bg-slate-100 gap-10 py-10 ">
			{isOpen && <PaymentPopup />}
			<div className="flexCenter flex-wrap gap-2">
				{categories.map((el, index) => (
					<div
						key={index}
						onClick={() => setCategory(el.title)}
						className={`${
							category === el.title ? 'text-additional2' : 'text-black'
						} buttonStyle p-0 cursor-pointer bg-background flexCenter flex-col size-20 sm:size-24`}
					>
						{el.image}
						<p className="text-[0.7rem]">{el.title}</p>
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
				<MentorCard />
			</div>
		</section>
	);
};
export default MentorListPage;
