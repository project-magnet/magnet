import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getMember} from '../../api/member';
import {MemberStore} from '../../store/MemberStore';
import ModalStore from '../../store/ModalStore';
import {LoginModal} from '../auth/LoginModal';

const Header = () => {
	const [fetchFinish, setFetchFinish] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const {isOpen, setIsOpenTure, setChildren} = ModalStore();
	const {globalMember} = MemberStore();

	const handleLogin = () => {
		setChildren(<LoginModal />);
		setIsOpenTure();
	};

	//헤더에서는 토큰으로만 멤버 정보를 불러옵니다.
	useEffect(() => {
		const fetchData = async () => {
			try {
				await getMember();
				console.log('헤더에서 멤버 정보를 성공적으로 불러왔습니다.');
			} catch (error) {
				console.error('헤더에서 멤버 정보를 불러오는 동안 오류가 발생했습니다:', error);
			} finally {
				setFetchFinish(true);
			}
		};
		sessionStorage.getItem('Authorization') ? fetchData() : setFetchFinish(true);
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
					<div className="*:flexCenter flex w-full justify-evenly *:w-36 *:flex-col sm:justify-end *:sm:flex-row">
						<button
							onClick={() => navigate('/mentorlist')}
							className={`activeStyle tracking-wide  ${'/mentorlist' === location.pathname && '*:text-black'}`}
						>
							<i
								className={`text-xl sm:text-base ri-${'/mentorlist' === location.pathname ? 'search-eye-line' : 'search-line'}`}
							/>
							<span className={`textSmall`}>둘러보기</span>
						</button>
						{globalMember ? (
							<>
								<button
									onClick={() => navigate('/user')}
									className={`activeStyle order-1 tracking-wide ${'/user' === location.pathname && '*:text-black'} `}
								>
									<i
										className={`text-xl sm:text-base  ri-${'/user' === location.pathname ? 'user-follow-line' : 'user-line'}`}
									/>
									<span className="textSmall truncate">{globalMember.nickName}</span>
								</button>
								{globalMember.roles.includes('MENTOR') && (
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
								onClick={() => handleLogin()}
								className={`activeStyle tracking-wide ${isOpen && 'text-black'}`}
							>
								<i
									className={`text-xl sm:text-base  ri-${isOpen ? 'login-circle-line' : 'login-box-line'}`}
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
