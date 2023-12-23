import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section className="flex items-center border-b-[1px] text-l  bg-white w-screen h-16 sticky top-0">
      <h1 className="tracking-[5px] font-bold mx-20">MAGNET</h1>
      <p className="tracking-wide font-semibold me-10">제안하기</p>
      <p className="tracking-wide font-semibold me-10">제안 받기</p>
    </section>
  );
};

export default Header;
