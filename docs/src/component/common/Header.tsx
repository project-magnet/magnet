import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className="flex items-center border-b-[1px] text-l 
     bg-white w-screen h-16 sticky top-0 opacity-95 backdrop-blur-3xl"
    >
      <Link to="/magnet" className="tracking-[5px] font-bold  mx-24 ">
        MAGNET
      </Link>
      <Link to="/login" className="tracking-wide  me-10">
        제안하기
      </Link>
      <Link to="/login" className="tracking-wide  me-10">
        제안받기
      </Link>
    </header>
  );
};

export default Header;
