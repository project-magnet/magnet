import MentorCard from '../component/MentorCard';
import {Link} from 'react-router-dom';

const HomePage = () => {
	return (
		<section>
			<section className="py-32 ">
				<div className="flexCol gap-4 ml-5 sm:ml-20 text-primary">
					<p className="text-3xl font-bold tracking-tighter  sm:text-6xl">Connect with Magnet</p>
					<p className=" text-secondary text-xs sm:text-xl">
						당신의 커리어 여정을 안내해 줄 완벽한 멘토를 찾아보세요.
					</p>
				</div>
			</section>

			<section className="py-12 bg-slate-100 flexCol justify-center items-center gap-10">
				<div className="flexCol items-center gap-5 ">
					<h2 className="text-3xl font-bold sm:text-5xl tracking-tighter text-primary">
						Meet our Mentors
					</h2>
					<p className=" text-secondary text-xl">멘티의 성공을 위해 노력하는 멘토를 만나보세요.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
					<MentorCard />
					<MentorCard />
					<MentorCard />
				</div>
				<Link to="/mentorlist">
					<button className="text-secondary font-bold">더 알아보기</button>
				</Link>
			</section>
		</section>
	);
};

export default HomePage;
