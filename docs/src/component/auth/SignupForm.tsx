import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <section className=" w-[500px] h-full flexCol items-center justify-center">
      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">이메일</p>
        <input className="input" placeholder="이메일을 입력하세요." />
      </div>
      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">이름</p>
        <input className="input" placeholder="이름을 입력하세요." />
      </div>
      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">비밀번호</p>
        <input type="password" className="input" placeholder="비밀번호를 입력하세요." />
      </div>
      <div className="mt-1">
        <input type="password" className="input" placeholder="비밀번호를 다시 한번 입력하세요." />
      </div>
      <button type="button" disabled className="w-96 h-12  text-white bg-blue-500 rounded-lg mt-10">
        로그인
      </button>
      <Link to="/loginemail">
        <p className="text-sm text-slate-400 mt-3">로그인으로 돌아가기</p>
      </Link>
    </section>
  );
};

export default SignupForm;
