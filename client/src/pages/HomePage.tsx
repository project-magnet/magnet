import {useNavigate} from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	const categories = [
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
	const onclick = () => {
		console.log(process.env.REACT_APP_BASE_URL, 'process.env.REACT_APP_BASE_URL');
		console.log(process.env.CLIENT_ID, 'process.env.CLIENT_ID');
	};

	return (
		<div className="flexCol rootPageSection justify-center gap-10 overflow-hidden lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col  font-PartialSansKR_Regular">
				<div className="text-[3rem] sm:text-[4rem] lg:text-[6rem] 2xl:text-[10rem]">
					<p className="" onClick={onclick}>
						모두를 위한
					</p>
					<p className="">멘토링 서비스</p>
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