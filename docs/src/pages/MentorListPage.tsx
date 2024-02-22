import MentorCard from '../component/MentorCard';
import 'remixicon/fonts/remixicon.css';
import PopupStore from '../store/PopupStore';
import {useEffect, useState} from 'react';
import PaymentPopup from '../component/payment/PaymentPopup';
import {getMentoringList, getMentoringListData, Content} from '../api/mentoring';
import {LodingContainer} from '../component/common/LoadingContainer';
import {useNavigate} from 'react-router-dom';

const MentoringListPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const [category, setCategory] = useState('ALL');
	const [offset, size] = [0, 10];
	const [mentoringList, setMentoringList] = useState<Content[] | null>(null);
	const navigate = useNavigate();

	const categories = [
		{title: '전체', id: 'ALL', image: <i className="ri-menu-line ri-2x"></i>},
		{title: '개발', id: 'DEVELOPMENT', image: <i className="ri-code-s-slash-line ri-2x"></i>},
		{title: '마케팅', id: 'MARKETING', image: <i className="ri-megaphone-line ri-2x"></i>},
		{
			title: '프로덕트 매니저',
			id: 'PRODUCT_MANAGER',
			image: <i className="ri-user-settings-line  ri-2x"></i>,
		},
		{title: '백엔드', id: 'BACKEND', image: <i className="ri-send-to-back ri-2x"></i>},
		{title: '프론트엔드', id: 'FRONTEND', image: <i className="ri-bring-to-front ri-2x"></i>},
		{title: '데브옵스', id: 'DEVOPS', image: <i className="ri-file-settings-line ri-2x"></i>},
		{
			title: '데이터 엔지니어',
			id: 'DATA_ENGINEER',
			image: <i className="ri-line-chart-line ri-2x"></i>,
		},
		{
			title: '서버 엔자니어',
			id: 'SERVER_ENGINEER',
			image: <i className="ri-database-2-line ri-2x"></i>,
		},
		{title: 'AI', id: 'AI', image: <i className="ri-robot-3-line ri-2x"></i>},
	];

	useEffect(() => {
		navigate(`/mentorlist?category=${category}`);
	}, [category]);

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

	useEffect(() => {
		const fetchMentoringList = async () => {
			try {
				const data: getMentoringListData = await getMentoringList(offset, size);
				setMentoringList(data.content);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentoringList();
	}, []);

	return (
		<section className="flexCol h-full w-full items-center gap-10 bg-slate-100 py-10">
			{isOpen && <PaymentPopup />}
			<div className="flexCenter flex-wrap gap-2 ">
				{categories.map((el, index) => (
					<div
						key={index}
						onClick={() => setCategory(el.id)}
						className={`${
							category === el.id ? 'text-additional2' : 'text-black'
						} buttonStyle flexCenter size-20 cursor-pointer flex-col bg-background p-0 sm:size-24`}
					>
						{el.image}
						<p className="text-2xs">{el.title}</p>
					</div>
				))}
			</div>
			<div className="flexCenter flex-wrap gap-5 ">
				{mentoringList ? (
					<>
						{mentoringList
							.filter(el => el.category === category || category === 'ALL')
							.map((el, index) => (
								<MentorCard mentoring={el} key={index} />
							))}
					</>
				) : (
					<LodingContainer />
				)}
			</div>
		</section>
	);
};
export default MentoringListPage;
