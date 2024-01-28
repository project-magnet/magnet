import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMentor, setIsMentor] = useState(false); // [TODO] 로그인 시 멘토인지 멘티인지 확인하는 로직 필요
  const token = sessionStorage.getItem('fakeToken');

  useEffect(() => {
    const token = sessionStorage.getItem('fakeToken');
    if (token === 'mentor') {
      setIsMentor(true);
    }
  }, [isMentor]);

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
      {token ? (
        <>
          <Link to="/user" className="tracking-wide hidden sm:block mr-10">
            마이페이지
          </Link>
          {isMentor && (
            <Link to="/creatementoring" className="tracking-wide hidden sm:block">
              멘토링 개설하기
            </Link>
          )}
        </>
      ) : (
        <Link to="/login" className="tracking-wide hidden sm:block mr-10">
          로그인
        </Link>
      )}
    </header>
  );
};

export default Header;
