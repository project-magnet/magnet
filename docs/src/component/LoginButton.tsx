import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <div className=" w-80 h-12 flexCenter bg-white border-[1px] rounded-xl cursor-pointer">
      <p className="font-semibold">아무 계정으로 계속하기</p>
    </div>
  );
};

export default LoginButton;
