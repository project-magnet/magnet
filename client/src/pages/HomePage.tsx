import {useNavigate} from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/mentorlist`);
	};

	return (
		<div className="flexCol h-pageRoot justify-evenly overflow-x-hidden bg-gradient-to-b from-white to-slate-100  lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col">
				<div className="flexCenter hidden  flex-col sm:text-[6rem] lg:block 2xl:text-[11rem]  ">
					<p className="font-PartialSansKR_Regular">Connect</p>
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

			<section className="flexCenter">
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
			</section>
		</div>
	);
};

export default HomePage;
