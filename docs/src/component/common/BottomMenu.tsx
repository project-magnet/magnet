import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {getMember} from '../../api/member';
import {LoginPopupStore} from '../../store/LoginPopupStore';

const BottomMenu = () => {
	const [fetchFinish, setFetchFinish] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const location = useLocation();
	const setLoginPopupIsOpenTrue = LoginPopupStore(state => state.setLoginPopupIsOpenTrue);
	const loginPopupIsOpen = LoginPopupStore(state => state.loginPopupIsOpen);

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
		<>
			{fetchFinish ? (
				<section
					className="flexCenter fixed bottom-0 h-14 w-full justify-around 
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

					{isMentor ? (
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
						<div
							onClick={() => setLoginPopupIsOpenTrue()}
							className={`w-20 ${loginPopupIsOpen ? 'text-additional2' : 'text-black'} transition`}
						>
							<div className="flexCenter flex-col">
								{'/login' === location.pathname ? (
									<i className="ri-login-circle-line"></i>
								) : (
									<i className="ri-login-box-line"></i>
								)}

								<p className={`text-2xs`}>로그인</p>
							</div>
						</div>
					)}
				</section>
			) : null}
		</>
	);
};

export default BottomMenu;
