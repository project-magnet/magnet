import {useNavigate} from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/mentorlist`);
	};

	return (
		<div className="flexCol h-pageRoot justify-evenly overflow-x-hidden bg-gradient-to-b from-white to-blue-100 sm:bg-gradient-to-r lg:flex-row">
			<section className="flexCenter animate-showSideRight flex-col drop-shadow-xl">
				<div className="flexCenter hidden  flex-col sm:text-[6rem] lg:block 2xl:text-[11rem]  ">
					<p className="font-PartialSansKR_Regular">Connect</p>
					<p className="font-PartialSansKR_Regular">With</p>
					<div className="flex text-additional2 ">
						{['M', 'a', 'g', 'n', 'e', 't', '!'].map((el, index) => (
							<span className="hoverAnimationUpDown font-PartialSansKR_Regular" key={index}>
								{el}
							</span>
						))}
					</div>
				</div>

				<div className="text-[3rem] font-bold drop-shadow-xl sm:text-[4rem] lg:hidden ">
					<p className="">모두를 위한</p>
					<p className="">멘토링 서비스</p>
					<div className="flex text-additional2">
						{['마', '그', '넷', '!'].map((el, index) => (
							<span className="hover:animate-tickle " key={index}>
								{el}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="flexCenter ">
				<div className="flexCenter w-full flex-col gap-10 drop-shadow-md">
					<div className="hidden lg:block">
						<h1 className="text-[3rem] font-bold leading-none">
							모두를 위한
							<br />
							멘토링 서비스
						</h1>
						<p className="text-[3rem] font-bold leading-none text-additional2">마그넷</p>
					</div>
					{/* 버튼 모음 */}
					<div onClick={handleClick} className="flexCol w-full  gap-5 px-10 sm:px-44 lg:px-0">
						<button className="buttonStylePrimary">다양한 카테고리와</button>
						<button className="buttonStyleSecondary">최고의 멘토를</button>
						<button className="buttonStyleTertiary">만나 보세요!</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
