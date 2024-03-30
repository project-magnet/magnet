import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getMember} from '../../api/member';
import {LoginPopupStore} from '../../store/LoginPopupStore';
import {MemberStore} from '../../store/MemberStore';

const Header = () => {
	const [fetchFinish, setFetchFinish] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
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
			<header className="flexCenter fixed bottom-0 z-30 h-16 w-screen rounded-t-3xl border bg-white *:select-none sm:top-0  sm:z-10 sm:h-12 sm:justify-between sm:border-none sm:px-10">
				<button
					onClick={() => navigate('/')}
					className={'activeStyle hidden tracking-[5px] sm:block'}
				>
					<p className={`${'/' === location.pathname && 'text-black'} font-PartialSansKR_Regular `}>
						MAGNET
					</p>
				</button>
				{fetchFinish && (
					<div className="*:flexCenter flex w-full justify-evenly *:flex-col sm:justify-end *:sm:flex-row">
						<button
							onClick={() => navigate('/mentorlist')}
							className={`activeStyle tracking-wide  ${'/mentorlist' === location.pathname && '*:text-black'}`}
						>
							<i
								className={`text-xl sm:text-base ri-${'/mentorlist' === location.pathname ? 'search-eye-line' : 'search-line'}`}
							/>
							<span className={`textSmall`}>둘러보기</span>
						</button>
						{sessionStorage.getItem('Authorization') ? (
							<>
								<button
									onClick={() => navigate('/user')}
									className={`activeStyle order-1 tracking-wide ${'/user' === location.pathname && '*:text-black'} `}
								>
									<i
										className={`text-xl sm:text-base  ri-${'/user' === location.pathname ? 'user-follow-line' : 'user-line'}`}
									/>
									<span className="textSmall">{globalMember.nickName}</span>
								</button>
								{isMentor && (
									<button
										onClick={() => navigate('/creatementoring')}
										className={`activeStyle tracking-wide ${
											'/creatementoring' === location.pathname && '*:text-black'
										}`}
									>
										<i
											className={`text-xl sm:text-base  ri-${'/creatementoring' === location.pathname ? 'link' : 'link-unlink'}`}
										/>

										<span className="textSmall">멘토링 개설</span>
									</button>
								)}
							</>
						) : (
							<div
								onClick={() => setLoginPopupIsOpenTrue()}
								className={`activeStyle tracking-wide ${loginPopupIsOpen && 'text-black'}`}
							>
								<i
									className={`text-xl sm:text-base  ri-${loginPopupIsOpen ? 'login-circle-line' : 'login-box-line'}`}
								/>

								<span className={`textSmall`}>로그인</span>
							</div>
						)}
					</div>
				)}
			</header>
			<div className="flexCenter h-10 w-full sm:invisible">
				<button onClick={() => navigate('/')} className={'activeStyle tracking-[5px]'}>
					<p className={`${'/' === location.pathname && 'text-black'} font-PartialSansKR_Regular `}>
						MAGNET
					</p>
				</button>
			</div>
		</>
	);
};

export default Header;
