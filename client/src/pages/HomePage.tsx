import {useNavigate} from 'react-router-dom';
import {categories} from '../asset/categories';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="flexCol rootPageSection justify-center gap-10 overflow-hidden lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col  font-PartialSansKR_Regular">
				<div className="text-[3rem] sm:text-[4rem] lg:text-[6rem] 2xl:text-[10rem]">
					<p>모두를 위한</p>
					<p>멘토링 서비스</p>
					<div className="flex text-additional2">
						{['마', '그', '넷', '!'].map((el, index) => (
							<span className="hover:animate-tickle" key={index}>
								{el}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className=" noScroll flexCenter h-fit w-screen animate-Tilting overflow-scroll bg-white shadow-md transition duration-300 hover:shadow-xl sm:bottom-10 lg:bottom-0 lg:right-32 lg:h-screen lg:w-fit ">
				<div className="lg:flexCol flex animate-translateX gap-2 py-3 sm:gap-8 lg:animate-translateY lg:gap-16 lg:py-10">
					{categories.map((el, index) => (
						<button
							key={index}
							onClick={() => navigate(`/mentorlist`)}
							className={`activeStyle flexCenter h-16 min-w-28 flex-col text-black hover:text-additional3 `}
						>
							<i className={`ri-${el.icon} ri-2x`} />
							<p className="text-2xs">{el.title}</p>
						</button>
					))}
				</div>
			</section>
		</div>
	);
};

export default HomePage;
