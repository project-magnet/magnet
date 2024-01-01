import React from 'react';
import SignupForm from '../component/auth/SignupForm';

const SignupPage = () => {
  return (
    <div className="w-screen h-[80vh] flexCenter flex-col">
      <p className="text-2xl font-semibold">이메일로 회원가입</p>
      <section className="">
        <SignupForm />
      </section>
    </div>
  );
};

export default SignupPage;
