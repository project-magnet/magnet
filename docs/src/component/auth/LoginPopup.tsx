import {LoginPopupStore} from '../../store/LoginPopupStore';
import LoginForm from './LoginForm';
import {useEffect} from 'react';
import LoginButton from './LoginButton';
import {LogoMagnet} from '../common/LogoMagnet';

export const LoginPopup = () => {
	const setLoginPopupIsOpenFalse = LoginPopupStore(state => state.setLoginPopupIsOpenFalse);
	const LoginPopupIsOpen = LoginPopupStore(state => state.loginPopupIsOpen);
	const handleClick = (e: React.MouseEvent<any>) => {
		if (e.target === e.currentTarget) {
			setLoginPopupIsOpenFalse();
		}
	};

	useEffect(() => {
		if (LoginPopupIsOpen) {
			document.body.style.overflow = 'visible'; // 페이지 스크롤 방지
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
			className="flexCenter fixed top-0 z-20 size-full bg-black bg-opacity-30 backdrop-blur-sm"
		>
			<section className="flexCenter relative w-11/12 flex-col gap-5 rounded-md bg-white p-5 md:w-fit md:px-20">
				<div className="absolute right-1 top-1">
					<i
						onClick={handleClick}
						className="ri-close-line cursor-pointer text-2xl  text-slate-400 transition-colors duration-300 hover:text-black"
					></i>
				</div>
				<LogoMagnet word="MAGNET" />
				<LoginForm />
				<div className="flexCenter my-5 w-full gap-5">
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
