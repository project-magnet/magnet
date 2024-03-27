import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {getMember} from '../../api/member';
import {LoginPopupStore} from '../../store/LoginPopupStore';
import {MemberStore} from '../../store/MemberStore';

const Header = () => {
	const [fetchFinish, setFetchFinish] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const location = useLocation();
	const setLoginPopupIsOpenTrue = LoginPopupStore(state => state.setLoginPopupIsOpenTrue);
	const loginPopupIsOpen = LoginPopupStore(state => state.loginPopupIsOpen);
	const globalMember = MemberStore(state => state.globalMember);

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
			<header className="flexCenter fixed top-0 z-10 h-10 w-dvw bg-white px-10 *:select-none sm:h-16 sm:justify-between">
				<Link to="/" className={'activeStyle tracking-[5px]'}>
					<p className={`${'/' === location.pathname && 'text-black'} font-PartialSansKR_Regular `}>
						MAGNET
					</p>
				</Link>
				{fetchFinish && (
					<div className="flex *:hidden *:sm:block">
						<Link
							to="/mentorlist"
							className={`activeStyle ${'/mentorlist' === location.pathname && 'text-black'}`}
						>
							<i
								className={`ri-${'/mentorlist' === location.pathname ? 'search-eye-line' : 'search-line'} mr-1`}
							/>
							<span className={`text-sm`}>둘러보기</span>
						</Link>
						{sessionStorage.getItem('Authorization') ? (
							<>
								<Link
									to="/user"
									className={`activeStyle order-1 ${'/user' === location.pathname && 'text-black'} `}
								>
									<i
										className={`ri-${'/user' === location.pathname ? 'user-follow-line' : 'user-line'} mr-1`}
									/>
									<span className="text-sm ">{globalMember.nickName}</span>
								</Link>
								{isMentor && (
									<Link
										to="/creatementoring"
										className={`activeStyle ${
											'/creatementoring' === location.pathname && 'text-black'
										}`}
									>
										<i
											className={`ri-${'/creatementoring' === location.pathname ? 'link' : 'link-unlink'} mr-1`}
										/>

										<span className="text-sm">멘토링 개설하기</span>
									</Link>
								)}
							</>
						) : (
							<div
								onClick={() => setLoginPopupIsOpenTrue()}
								className={`activeStyle ${loginPopupIsOpen && 'text-black'}`}
							>
								<i
									className={`ri-${loginPopupIsOpen ? 'login-circle-line' : 'login-box-line'} mr-1`}
								/>

								<span className={`text-sm`}>로그인</span>
							</div>
						)}
					</div>
				)}
			</header>
			<div className="h-10" />
		</>
	);
};

export default Header;
