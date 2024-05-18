import {useEffect, useState} from 'react';
import MentorCard from '../component/MentorCard';
import {LodingContainer} from '../component/common/LoadingContainer';
import {getMentoringList, Content} from '../api/mentoring';
import {categories} from '../asset/categories';

const MentoringListPage = () => {
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState('ALL');
	const [mentoringList, setMentoringList] = useState<Content[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [size, setSize] = useState(3);
	const newCategories = [{id: 'ALL', title: '전체', icon: 'menu-line'}].concat(categories);
	const filteredMentoringList = mentoringList.filter(
		el => el.category === category || category === 'ALL',
	);

	useEffect(() => {
		const fetchMentoringList = async () => {
			try {
				const data = await getMentoringList(currentPage, size);
				setMentoringList(data.content);
				setTotalPages(data.totalPages);
				console.log(data);
			} catch (error) {
				console.error('멘토 리스트를 불러오는 동안 오류가 발생했습니다:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchMentoringList();
	}, [currentPage, size]);

	const handlePreviousPage = () => {
		setCurrentPage(prevPage => prevPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	return (
		<section className="flexCol rootPageSection items-center gap-10 py-10 sm:px-10">
			<div className="flexCenter animate-fadeInMoveDown flex-wrap">
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
			{loading ? (
				<LodingContainer />
			) : filteredMentoringList.length === 0 ? (
				<div className="flexCol mt-20 items-center gap-2">
					<img
						src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png"
						alt="Crying Face"
						width="100"
						className="animate-downALittle"
					/>
					<p className="animate-fadeIn font-bold transition-opacity delay-300">
						아무리 찾아봐도 없네요...
					</p>
				</div>
			) : (
				<>
					<div className="mt-4 flex w-full justify-end px-10">
						<select
							value={size}
							onChange={e => setSize(parseInt(e.target.value))}
							className="buttonStyleTertiary outline-none"
						>
							<option value="3">3개씩 보기</option>
							<option value="6">6개씩 보기</option>
							<option value="9">9개씩 보기</option>
						</select>
					</div>
					<div className="flexCenter w-full flex-wrap gap-10">
						{filteredMentoringList.map((el, index) => (
							<MentorCard key={index} mentoring={el} />
						))}
					</div>
					<div className="flexCenter mt-4">
						<button
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
							className="buttonStyleTertiary font-semibold"
						>
							이전
						</button>
						<p className="px-4 py-2 font-semibold text-gray-700">
							{currentPage} / {totalPages}
						</p>
						<button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							className={`buttonStyleTertiary font-semibold`}
						>
							다음
						</button>
					</div>
				</>
			)}
		</section>
	);
};

export default MentoringListPage;
