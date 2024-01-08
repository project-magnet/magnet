import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <section
      className="flexCenter justify-around fixed bottom-0 h-14 w-full 
    border-t bg-white sm:hidden "
    >
      <Link to="/mentorlist" className="tracking-wide font-semibold">
        둘러보기
      </Link>
      <Link to="/login" className="tracking-wide font-semibold">
        로그인
      </Link>
    </section>
  );
};

export default BottomMenu;
