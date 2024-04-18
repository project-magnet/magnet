import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MentorCard from '../component/MentorCard';
import PaymentPopup from '../component/payment/PaymentPopup';
import {LodingContainer} from '../component/common/LoadingContainer';
import PopupStore from '../store/PopupStore';
import {getMentoringList, Content} from '../api/mentoring';
import {categories} from '../asset/categories';

const MentoringListPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[] | null>(null);
	const navigate = useNavigate();
	const newCategories = [{id: 'ALL', title: '전체', icon: 'menu-line'}].concat(categories);

	useEffect(() => {
		navigate(`/mentorlist?category=${category}`);
	}, [category, navigate]);

	useEffect(() => {
		const fetchMentoringList = async () => {
			try {
				const data = await getMentoringList(0, 100);
				setMentoringList(data.content);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentoringList();
	}, []);

	return (
		<section className="flexCol rootPageSection items-center gap-10 py-10 sm:px-10">
			{isOpen && <PaymentPopup />}
			<div className="flexCenter animate-fadeInMoveDown flex-wrap ">
				{newCategories.map((el, index) => (
					<button
						key={index}
						onClick={() => setCategory(el.id)}
						className={`${
							category === el.id && 'text-additional3'
						}   activeStyle flexCenter h-16 min-w-24 flex-col hover:text-additional3 `}
					>
						<i className={`ri-${el.icon} ri-2x ${category === el.id && 'animate-jelly'}`} />
						<p className="text-2xs">{el.title}</p>
					</button>
				))}
			</div>
			<div className="flexCenter w-full flex-wrap gap-10">
				{mentoringList ? (
					mentoringList
						.filter(el => el.category === category || category === 'ALL')
						.map((el, index) => <MentorCard mentoring={el} key={index} />)
				) : (
					<LodingContainer />
				)}
			</div>
		</section>
	);
};

export default MentoringListPage;
