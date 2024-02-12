import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const Header = () => {
	const [isMentor, setIsMentor] = useState(false); // [TODO] 로그인 시 멘토인지 멘티인지 확인하는 로직 필요
	const token = sessionStorage.getItem('Authorization');
	const location = useLocation();

	useEffect(() => {
		const token = sessionStorage.getItem('Authorization');
		if (token === 'mentor') {
			setIsMentor(true);
		}
	}, [isMentor]);

	return (
		<header
			className="flexCenter sm:justify-start  
   bg-white  h-10 sm:h-16 sticky top-0 opacity-95 border-b "
		>
			<Link to="/magnet" className="tracking-[5px] font-bold  mx-24 ">
				<p
					className={`${
						'/magnet' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					MAGNET
				</p>
			</Link>
			<Link
				to="/mentorlist"
				className={`tracking-wide hidden sm:block mr-10 ${
					'/mentorlist' === location.pathname ? 'text-additional2' : 'text-black'
				} transition`}
			>
				{'/mentorlist' === location.pathname ? (
					<i className="ri-search-eye-line mr-1"></i>
				) : (
					<i className="ri-search-line mr-1"></i>
				)}

				<span className="text-sm">둘러보기</span>
			</Link>
			{token ? (
				<>
					<Link
						to="/user"
						className={`tracking-wide hidden sm:block mr-10 ${
							'/user' === location.pathname ? 'text-additional2' : 'text-black'
						} transition`}
					>
						{'/user' === location.pathname ? (
							<i className="ri-user-follow-line mr-1"></i>
						) : (
							<i className="ri-user-line mr-1"></i>
						)}

						<span className="text-sm ">내 정보</span>
					</Link>
					{isMentor && (
						<Link
							to="/creatementoring"
							className={`tracking-wide hidden sm:block mr-10 ${
								'/creatementoring' === location.pathname ? 'text-additional2' : 'text-black'
							} transition`}
						>
							{'/creatementoring' === location.pathname ? (
								<i className="ri-link mr-1"></i>
							) : (
								<i className="ri-link-unlink mr-1"></i>
							)}

							<span className="text-sm">멘토링 개설하기</span>
						</Link>
					)}
				</>
			) : (
				<Link
					to="/login"
					className={`tracking-wide hidden sm:block mr-10 ${
						'/login' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					{'/login' === location.pathname ? (
						<i className="ri-login-circle-line mr-1"></i>
					) : (
						<i className="ri-login-box-line mr-1"></i>
					)}

					<span className={`text-sm`}>로그인</span>
				</Link>
			)}
		</header>
	);
};

export default Header;
