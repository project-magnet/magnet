import {useNavigate} from 'react-router-dom';
import {categories} from '../asset/categories';
import {SwapText} from '../component/SwapText';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="flexCol rootPageSection justify-center gap-10 overflow-hidden lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col  font-PartialSansKR_Regular">
				<div className="text-[3rem] sm:text-[4rem] lg:text-[6rem] 2xl:text-[10rem]">
					<SwapText
						textList={['모두를 위한', '백엔드', '프론트엔드', '데브옵스', '웹 디자이너', 'UI/UX']}
					/>
					<p>멘토링 서비스</p>
					<div className="flex text-additional3">
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
