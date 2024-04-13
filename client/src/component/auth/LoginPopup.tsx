import {LoginPopupStore} from '../../store/LoginPopupStore';
import LoginForm from './LoginForm';
import {useEffect} from 'react';
import LoginButton from './OAuthButton';
import {LogoTickle} from '../common/LogoTickle';
import {PopupCloseButton} from '../common/PopupCloseButton';
import {useNavigate} from 'react-router-dom';

export const LoginPopup = () => {
	const setLoginPopupIsOpenFalse = LoginPopupStore(state => state.setLoginPopupIsOpenFalse);
	const LoginPopupIsOpen = LoginPopupStore(state => state.loginPopupIsOpen);
	const navigate = useNavigate();

	const handleClick = (e: React.MouseEvent<any>) => {
		if (e.target === e.currentTarget) {
			setLoginPopupIsOpenFalse();
		}
	};
	const handleSignupLink = () => {
		setLoginPopupIsOpenFalse();
		navigate('/signup');
	};

	useEffect(() => {
		if (LoginPopupIsOpen) {
			document.body.style.overflow = 'hidden'; // 페이지 스크롤 방지
		} else {
			document.body.style.overflow = 'auto'; // 페이지 스크롤 허용
		}
		return () => {
			document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
		};
	}, [LoginPopupIsOpen]);

	return (
		<div
			onClick={handleClick}
			className="flexCenter fixed top-0 z-30 size-full animate-fadeIn bg-black bg-opacity-50 backdrop-blur-sm "
		>
			<section className="flexCenter relative w-11/12 flex-col gap-5 rounded-md bg-white p-5 md:w-fit md:px-20">
				<PopupCloseButton handleClick={handleClick} />
				<LogoTickle word="MAGNET" />
				<LoginForm />

				<button onClick={() => handleSignupLink()} className="activeStyle text-sm">
					이메일로 회원가입
				</button>
				<div className="flexCenter w-full gap-5">
					<div className="h-[0.1px]  w-full border " />
					<p className="w-20 flex-grow text-xs text-slate-400">또는</p>
					<div className="h-[0.1px] w-full border " />
				</div>

				<div className="flexCenter gap-3">
					<div className="size-12  ">
						<LoginButton type="Google" />
					</div>
					<div className="size-12 ">
						<LoginButton type="Kakao" />
					</div>
					<div className="size-12 ">
						<LoginButton type="Naver" />
					</div>
				</div>
			</section>
		</div>
	);
};
