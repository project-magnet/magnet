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
			<Link to="/mentorlist" className={`tracking-wide hidden sm:block mr-10`}>
				<p
					className={`${
						'/mentorlist' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					둘러보기
				</p>
			</Link>
			{token ? (
				<>
					<Link to="/user" className="tracking-wide hidden sm:block mr-10">
						<p
							className={`${
								'/user' === location.pathname ? 'text-additional2' : 'text-black'
							} transition`}
						>
							마이페이지
						</p>
					</Link>
					{isMentor && (
						<Link to="/creatementoring" className="tracking-wide hidden sm:block">
							<p
								className={`${
									'/creatementoring' === location.pathname ? 'text-additional2' : 'text-black'
								} transition`}
							>
								멘토링 개설하기
							</p>
						</Link>
					)}
				</>
			) : (
				<Link to="/login" className="tracking-wide hidden sm:block mr-10 ">
					<p
						className={`${
							'/login' === location.pathname ? 'text-additional2' : 'text-black'
						} transition`}
					>
						로그인
					</p>
				</Link>
			)}
		</header>
	);
};

export default Header;
