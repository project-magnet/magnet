import React from 'react';
import LoginButton from '../component/auth/LoginButton';

const LoginPage = () => {
  return (
    <div className="w-full h-[80vh] flexCenter">
      <section className="w-80 h-[350px] container flexCol items-center justify-evenly">
        <LoginButton type="Google" />
        <LoginButton type="Kakao" />
        <LoginButton type="Naver" />
        <LoginButton type="Email" />
      </section>
      <section className=" ml-6 hidden md:block">
        <p className="text-7xl  px-2 py-1 relative">
          쉽고, 간편하게
          <span className="absolute right-0 top-0 h-full w-[3px] bg-black animate-blink"></span>
        </p>
        <p className="text-lg bg-red text-slate-500 mt-3 px-2">
          커리어를 향해 나를 이끄는 곳, 마그넷
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
