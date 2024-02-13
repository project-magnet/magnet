import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const BottomMenu = () => {
	const location = useLocation();
	const [isMentor, setIsMentor] = useState(false);
	const token = sessionStorage.getItem('Authorization');

	useEffect(() => {
		const token = sessionStorage.getItem('Authorization');
		if (token === 'mentor') {
			setIsMentor(true);
		}
	}, [isMentor]);

	return (
		<section
			className="flexCenter justify-around fixed bottom-0 h-14 w-full 
    border-t bg-white sm:hidden"
		>
			<Link
				to="/mentorlist"
				className={`w-20 ${
					'/mentorlist' === location.pathname ? 'text-additional2' : 'text-black'
				} transition`}
			>
				<div className="flexCenter flex-col">
					{'/mentorlist' === location.pathname ? (
						<i className="ri-search-eye-line "></i>
					) : (
						<i className="ri-search-line"></i>
					)}
					<p className="text-2xs">둘러보기</p>
				</div>
			</Link>

			{token ? (
				<>
					<Link
						to="/user"
						className={`w-20 ${
							'/user' === location.pathname ? 'text-additional2' : 'text-black'
						} transition`}
					>
						<div className="flexCenter flex-col">
							{'/user' === location.pathname ? (
								<i className="ri-user-follow-line"></i>
							) : (
								<i className="ri-user-line"></i>
							)}
							<span className="text-2xs">내 정보</span>
						</div>
					</Link>
					{isMentor && (
						<Link
							to="/creatementoring"
							className={`w-20  ${
								'/creatementoring' === location.pathname ? 'text-additional2' : 'text-black'
							} transition`}
						>
							<div className="flexCenter flex-col">
								{'/creatementoring' === location.pathname ? (
									<i className="ri-link"></i>
								) : (
									<i className="ri-link-unlink"></i>
								)}

								<span className="text-2xs">멘토링 개설하기</span>
							</div>
						</Link>
					)}
				</>
			) : (
				<Link
					to="/login"
					className={`w-20 ${
						'/login' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					<div className="flexCenter flex-col">
						{'/login' === location.pathname ? (
							<i className="ri-login-circle-line"></i>
						) : (
							<i className="ri-login-box-line"></i>
						)}

						<p className={`text-2xs`}>로그인</p>
					</div>
				</Link>
			)}
		</section>
	);
};

export default BottomMenu;
