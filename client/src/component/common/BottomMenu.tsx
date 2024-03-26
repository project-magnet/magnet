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
					className="flexCenter fixed bottom-0 z-50 h-16 w-full 
    				justify-around rounded-t-3xl border-t bg-white shadow-2xl sm:hidden"
				>
					<Link
						to="/mentorlist"
						className={`activeStyle w-20 ${'/mentorlist' === location.pathname && 'text-black'} `}
					>
						<div className="flexCenter flex-col">
							<i
								className={`ri-xl ri-${'/mentorlist' === location.pathname ? 'search-eye-line' : 'search-line'}`}
							/>
							<p className="mt-2 text-2xs">둘러보기</p>
						</div>
					</Link>

					{isMentor ? (
						<>
							<Link
								to="/user"
								className={`activeStyle w-20 ${'/user' === location.pathname && 'text-black'} `}
							>
								<div className="flexCenter flex-col">
									<i
										className={`ri-xl ri-${'/user' === location.pathname ? 'user-follow-line' : 'user-line'}`}
									/>
									<span className="mt-2 text-2xs">내 정보</span>
								</div>
							</Link>
							{isMentor && (
								<Link
									to="/creatementoring"
									className={`activeStyle w-20  ${
										'/creatementoring' === location.pathname && 'text-black'
									} transition`}
								>
									<div className="flexCenter flex-col">
										<i
											className={`ri-xl ri-${'/creatementoring' === location.pathname ? 'link' : 'link-unlink'}`}
										/>
										<span className="mt-2 text-2xs">멘토링 개설</span>
									</div>
								</Link>
							)}
						</>
					) : (
						<div
							onClick={() => setLoginPopupIsOpenTrue()}
							className={`activeStyle w-20 ${loginPopupIsOpen && 'text-black'}`}
						>
							<div className="flexCenter flex-col ">
								<i
									className={`ri-xl ri-${loginPopupIsOpen ? 'login-circle-line' : 'login-box-line'}`}
								/>
								<p className={`mt-2 text-2xs`}>로그인</p>
							</div>
						</div>
					)}
				</section>
			) : null}
		</>
	);
};

export default BottomMenu;
