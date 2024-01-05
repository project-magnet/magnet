import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className="flex items-center text-l 
     bg-white  h-16 sticky top-0 opacity-95 border-b"
    >
      <Link to="/magnet" className="tracking-[5px] font-bold  mx-24 ">
        MAGNET
      </Link>
      <Link to="/mentorlist" className="tracking-wide  mr-10">
        둘러보기
      </Link>
      <Link to="/login" className="tracking-wide">
        로그인
      </Link>
    </header>
  );
};

export default Header;
