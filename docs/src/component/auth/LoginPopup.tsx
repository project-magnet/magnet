import {LoginPopupStore} from '../../store/LoginPopupStore';
import LoginForm from './LoginForm';
import {useEffect} from 'react';
import LoginButton from './LoginButton';

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
			className="flexCenter fixed top-0 z-20 size-full bg-black bg-opacity-30"
		>
			<section className="flexCenter flex-col gap-5 rounded-md border bg-white p-5">
				<div className="flex w-full justify-end">
					<i
						onClick={handleClick}
						className="ri-close-line cursor-pointer text-2xl  text-slate-400 transition-colors duration-300 hover:text-black"
					></i>
				</div>
				<LoginForm />
				<div className="my-3 w-full border border-dashed " />
				<div className="flexCenter gap-3">
					<p className="mr-5 text-sm ">쉽고, 간편한 로그인</p>
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
