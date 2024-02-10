import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const BottomMenu = () => {
	const location = useLocation();
	return (
		<section
			className="flexCenter justify-around fixed bottom-0 h-14 w-full 
    border-t bg-white sm:hidden "
		>
			<Link to="/mentorlist" className="tracking-wide font-semibold">
				<p
					className={`${
						'/mentorlist' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					둘러보기
				</p>
			</Link>
			<Link to="/login" className="tracking-wide font-semibold">
				<p
					className={`${
						'/login' === location.pathname ? 'text-additional2' : 'text-black'
					} transition`}
				>
					로그인
				</p>
			</Link>
		</section>
	);
};

export default BottomMenu;
