import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MentorCard from '../component/MentorCard';
import PaymentPopup from '../component/payment/PaymentPopup';
import {LodingContainer} from '../component/common/LoadingContainer';
import PopupStore from '../store/PopupStore';
import {getMentoringList, Content} from '../api/mentoring';

const MentoringListPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[] | null>(null);
	const navigate = useNavigate();

	const categories = [
		{title: '전체', id: 'ALL', icon: 'menu-line'},
		{title: '웹 디자인', id: 'WEB_DESIGN', icon: 'brush-2-line'},
		{title: 'UI/UX', id: 'UI_UX', icon: 'layout-2-line'},
		{
			title: '프로덕트 매니저',
			id: 'PRODUCT_MANAGER',
			icon: 'file-list-2-line',
		},
		{title: '백엔드', id: 'BACKEND', icon: 'send-to-back'},
		{title: '프론트엔드', id: 'FRONTEND', icon: 'bring-to-front'},
		{title: '데브옵스', id: 'DEVOPS', icon: 'cloud-line'},
		{
			title: '데이터 엔지니어',
			id: 'DATA_ENGINEER',
			icon: 'database-2-line',
		},
		{
			title: '서버 엔자니어',
			id: 'SERVER_ENGINEER',
			icon: 'server-line',
		},
		{title: 'AI', id: 'AI', icon: 'robot-3-line'},
	];

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
				{categories.map((el, index) => (
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
