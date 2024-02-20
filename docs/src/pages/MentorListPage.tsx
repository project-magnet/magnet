import MentorCard from '../component/MentorCard';
import 'remixicon/fonts/remixicon.css';
import PopupStore from '../store/PopupStore';
import {useEffect, useState} from 'react';
import PaymentPopup from '../component/payment/PaymentPopup';
import {getMentoringList, getMentoringListData, Content} from '../api/mentoring';

const MentorListPage = () => {
	const isOpen = PopupStore(state => state.isOpen);
	const [category, setCategory] = useState('전체');
	const [offset, size] = [0, 10];
	const [fetchFinish, setFetchFinish] = useState(false);
	const [mentorList, setMentorList] = useState<Content[]>([]);

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
				const data: getMentoringListData = await getMentoringList(offset, size);
				setMentorList(data.content);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		fetchMentorList().finally(() => {
			setFetchFinish(true);
			console.log(mentorList);
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
						{mentorList.length === 0 && (
							<MentorCard
								data={{
									mentorName: '데이터를 불러오지 못했습니다.',
									career: '아마 서버가 꺼져있을 것입니다.',
									field: '아니면 데이터베이스에 문제가 있을 것입니다.',
									task: '아니면 내가 코드를 잘못 짰을 수도 있습니다.',
									title:
										'그러니까 문제를 확인하러 가볼까요? 길을 잃었을 때는 다시 돌아가는 것이 가장 빠른 길입니다.',
								}}
							/>
						)}

						{mentorList.map((el, index) => (
							<MentorCard
								data={{
									mentorName: el.mentorName,
									career: el.career,
									field: el.field,
									task: el.task,
									title: el.title,
								}}
								key={index}
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
