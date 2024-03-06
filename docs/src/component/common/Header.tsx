import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {getMember} from '../../api/member';

const Header = () => {
	const [fetchFinish, setFetchFinish] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getMember();
				setIsMentor(data.roles.includes('MENTOR'));
			} catch (error) {
				console.error('멤버 정보를 불러오는 동안 오류가 발생했습니다:', error);
			}
		};
		sessionStorage.getItem('Authorization')
			? fetchData().finally(() => setFetchFinish(true))
			: setFetchFinish(true);
	}, []);

	return (
		<header className="flexCenter sticky top-0 z-10  h-10 border-b bg-white sm:h-16 sm:justify-start">
			<Link to="/magnet" className="mx-24 font-bold  tracking-[5px] ">
				<p
					className={`${
						'/magnet' === location.pathname ? 'text-additional2' : 'text-black'
					} font-PartialSansKR_Regular transition`}
				>
					MAGNET
				</p>
			</Link>
			{fetchFinish && (
				<>
					<Link
						to="/mentorlist"
						className={`mr-10 hidden sm:block ${
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
					{sessionStorage.getItem('Authorization') ? (
						<>
							<Link
								to="/user"
								className={`mr-10 hidden sm:block ${
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
									className={`mr-10 hidden sm:block ${
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
							className={`mr-10 hidden sm:block ${
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
				</>
			)}
		</header>
	);
};

export default Header;
