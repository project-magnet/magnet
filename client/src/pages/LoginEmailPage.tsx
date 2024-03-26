import React from 'react';
import LoginForm from '../component/auth/LoginForm';

const LoginEmailPage = () => {
  return (
    <div className="w-full h-[80vh] flexCenter flex-col">
      <p className="text-2xl font-semibold">이메일로 로그인</p>
      <section className="">
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginEmailPage;
