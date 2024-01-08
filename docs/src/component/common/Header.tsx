import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className="flexCenter sm:justify-start  
   bg-white  h-10 sm:h-16 sticky top-0 opacity-95 border-b "
    >
      <Link to="/magnet" className="tracking-[5px] font-bold  mx-24 ">
        MAGNET
      </Link>
      <Link to="/mentorlist" className="tracking-wide hidden sm:block mr-10">
        둘러보기
      </Link>
      <Link to="/login" className="tracking-wide hidden sm:block">
        로그인
      </Link>
    </header>
  );
};

export default Header;
