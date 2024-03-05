import React from 'react';
import LoginButton from '../component/auth/LoginButton';

const LoginPage = () => {
	const handler = () => {
		const fakeTokenGenerator = () => {
			// 일반 멤버로 설정
			sessionStorage.setItem('Authorization', 'member');
		};
		fakeTokenGenerator();
		window.location.reload();
		window.location.href = '/magnet';
	};

	return (
		<div className="flexCenter h-[80vh] w-full">
			<section className="flexCol container h-[350px] w-80 items-center justify-evenly">
				<LoginButton type="Google" />
				<LoginButton type="Kakao" />
				<LoginButton type="Naver" />
				<LoginButton type="Email" />
				<button className="buttonStyle p-5" onClick={handler}>
					임시 로그인
				</button>
			</section>
			<section className=" ml-6 hidden md:block">
				<p className="relative  px-2 py-1 text-7xl font-black">
					쉽고, 간편하게
					<span className="absolute right-0 top-0 h-full w-[3px] animate-blink bg-black"></span>
				</p>
				<p className="bg-red mt-3 px-2 text-lg text-slate-500">
					커리어를 향해 나를 이끄는 곳, 마그넷
				</p>
			</section>
		</div>
	);
};

export default LoginPage;
