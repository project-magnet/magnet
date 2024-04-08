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

	return (
		<div className="flexCol h-pageRoot items-center justify-evenly overflow-hidden bg-gradient-to-b from-white  to-slate-100 lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col">
				<div className="flexCenter hidden  flex-col sm:text-[6rem] lg:block 2xl:text-[11rem]  ">
					<p className="font-PartialSansKR_Regular">Connecting</p>
					<p className="font-PartialSansKR_Regular">With</p>
					<div className="flex text-additional2 ">
						{['M', 'A', 'G', 'N', 'E', 'T', '!'].map((el, index) => (
							<span className="hoverAnimationUpDown font-PartialSansKR_Regular" key={index}>
								{el}
							</span>
						))}
					</div>
				</div>

				<div className="text-[3rem] font-bold sm:text-[4rem] lg:hidden ">
					<p className="">모두를 위한</p>
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

			<section className="animate-Tilting noScroll flexCenter h-fit w-screen rotate-6 overflow-scroll bg-white py-3 shadow-md transition duration-300 hover:shadow-xl lg:h-screen lg:w-fit ">
				<div className="lg:flexCol animate-translateX lg:animate-translateY flex gap-10 lg:py-10">
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

			{/* <section className="flexCenter">
				<div className="flexCenter w-full flex-col gap-10">
					<div className="hidden lg:block">
						<h1 className="text-[3rem] font-bold leading-none">
							모두를 위한
							<br />
							멘토링 서비스
						</h1>
						<p className="text-[3rem] font-bold leading-none text-additional2">마그넷</p>
					</div>

					<div
						onClick={handleClick}
						className="flexCol interactionPushDown h-60 w-11/12 animate-fadeIn  
						 gap-5 divide-y-2 rounded-lg bg-background p-5 shadow-md sm:w-96"
					>
						<div className="textBase flexCol w-full flex-grow items-start gap-2">
							<p className="truncate font-PartialSansKR_Regular">MAGNET</p>
							<div className="textLarge line-clamp-3 h-3/5 pt-5 text-additional3  ">
								멘토링을 찾아보세요!
							</div>
						</div>

						<div className="flexCol textSmall w-full items-start gap-2 pt-2">
							<div className="text-secondary *:flex *:gap-2">
								<div>
									<i className="ri-building-line" />
									<p className="truncate ">Task</p>
								</div>
								<div>
									<i className="ri-bar-chart-2-line" />
									<p className="truncate">Career</p>
								</div>
								<div>
									<i className="ri-walk-line" />
									<p className="truncatey ">Field</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section> */}
		</div>
	);
};

export default HomePage;
