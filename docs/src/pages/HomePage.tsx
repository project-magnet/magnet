import {useNavigate} from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/mentorlist`);
	};

	return (
		<section>
			<section className=" py-20">
				<div
					className="flexCenter size-full flex-col 
				text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]"
				>
					<p className="font-PartialSansKR_Regular">
						Connect <br />
						with
					</p>
					<div className="flex text-additional2 *:font-PartialSansKR_Regular">
						{['M', 'a', 'g', 'n', 'e', 't', '!'].map((el, index) => (
							<p className="hoverAnimationUpDown " key={index}>
								{el}
							</p>
						))}
					</div>
				</div>
			</section>

			<section className="flexCenter justify-evenly  bg-additional2 py-20 ">
				<div className="flexCol hidden items-start gap-5 md:block">
					<h2 className="font-SEBANG_Gothic_Bold text-2xl ">Meet our Mentors</h2>
					<p className="font-SEBANG_Gothic_Bold  text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
						마그넷의 멘토를 만나보세요.
					</p>
				</div>

				{/* 카드 */}
				<div
					onClick={handleClick}
					className="buttonStyle flexCol size-72 animate-fadeIn cursor-pointer gap-5 bg-background p-5"
				>
					<div>
						<p className="truncate text-xl font-bold">마그넷과 함께</p>
						<p className="mt-1 truncate text-sm text-secondary">{`#각 분야의`}</p>
						<p className="mt-1 truncate text-sm text-secondary">{`#최고의 멘토와`}</p>
						<p className="mt-1 truncate text-sm text-secondary">{`#만나 보세요!`}</p>
					</div>
					<div className="h-0.5 w-full border border-dashed" />
					<div className="flexCenter size-full">
						<p className="animate-bounce font-SEBANG_Gothic_Bold text-3xl transition duration-300 hover:text-additional2">
							더 알아보기!
						</p>
					</div>
				</div>
			</section>
		</section>
	);
};

export default HomePage;
