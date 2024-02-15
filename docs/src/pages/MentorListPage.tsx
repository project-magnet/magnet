import MentorCard from '../component/MentorCard';
import 'remixicon/fonts/remixicon.css';
import PopupStore from '../store/PopupStore';
import {useEffect, useState} from 'react';
import PaymentPopup from '../component/payment/PaymentPopup';
import {getMentorList, getMentorListData} from '../api/mentor';

const MentorListPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const [category, setCategory] = useState('전체');
	const [offset, size] = [0, 10];
	const [fetchData, setFetchData] = useState(null);
	const [fetchFinish, setFetchFinish] = useState(false);
	const fakeData = [
		{
			mentorId: 1,
			mentorName: '데이터 가져오기를',
			career: '내부 로직이 문제겠죠',
			field: '아마 서버가 닫혔거나',
			task: '실패했습니다',
			email: '안녕하세요',
			phone: 'testUser3@gmail.com',
			aboutMe: '010-0000-0003',
			github: 'github.com/user3',
			mentoringId: 1,
			mentoringTitle: '그러니까 얼른 수정하러 갑시다.',
			mentoringContent: '그러니까 얼른 수정하러 갑시다.',
			mentoringPay: '1000',
			mentoringPeriod: '3 months',
			mentoringParticipants: 5,
			mentoringCategory: 'Programming',
		},
	];

	const categories = [
		{title: '전체', image: <i className="ri-menu-line ri-2x"></i>},
		{title: '개발', image: <i className="ri-code-s-slash-line ri-2x"></i>},
		{title: '마케팅', image: <i className="ri-megaphone-line ri-2x"></i>},
		{title: '프로덕트 매니저', image: <i className="ri-user-settings-line  ri-2x"></i>},
		{title: '백엔드', image: <i className="ri-send-to-back ri-2x"></i>},
		{title: '프론트엔드', image: <i className="ri-bring-to-front ri-2x"></i>},
		{title: '데브옵스', image: <i className="ri-file-settings-line ri-2x"></i>},
		{title: '데이터 엔지니어', image: <i className="ri-line-chart-line ri-2x"></i>},
		{title: '서버 엔자니어', image: <i className="ri-database-2-line ri-2x"></i>},
		{title: 'AI', image: <i className="ri-robot-3-line ri-2x"></i>},
	];

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
		const fetchMentorList = async () => {
			try {
				const data: getMentorListData = await getMentorList(offset, size);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentorList().finally(() => {
			setFetchFinish(true);
		});
	}, []);

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
						<p className="text-2xs">{el.title}</p>
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
				{fetchFinish ? (
					<>
						{fakeData.map(el => (
							<MentorCard
								data={{
									mentoringTitle: el.mentoringTitle,
									mentoringContent: el.mentoringContent,
									mentorName: el.mentorName,
									career: el.career,
									field: el.field,
									task: el.task,
								}}
							/>
						))}
					</>
				) : (
					'멘토 리스트를 불러오는 중입니다.'
				)}
			</div>
		</section>
	);
};
export default MentorListPage;
