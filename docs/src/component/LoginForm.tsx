import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <section className=" w-[500px] h-96 flexCol items-center justify-around">
      <div>
        <p className="text-slate-600 text-sm m-1">이메일</p>
        <input className="input" placeholder="이메일을 입력하세요." />
      </div>
      <div>
        <p className="text-slate-600 text-sm m-1">비밀번호</p>
        <input type="password" className="input" placeholder="비밀번호를 입력하세요." />
      </div>
      <button type="button" disabled className="w-96 h-12  text-white bg-blue-500 rounded-lg ">
        로그인
      </button>
      <Link to="/signup">
        <p className="text-sm text-slate-400">이메일로 회원가입</p>
      </Link>
    </section>
  );
};

export default LoginForm;
