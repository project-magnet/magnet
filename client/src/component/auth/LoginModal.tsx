import LoginForm from './LoginForm';
import LoginButton from './OAuthButton';
import {useNavigate} from 'react-router-dom';
import ModalStore from '../../store/ModalStore';

export const LoginModal = () => {
	const navigate = useNavigate();
	const {setIsOpenFalse} = ModalStore();

	const handleSignupLink = () => {
		setIsOpenFalse();
		navigate('/signup');
	};

	return (
		<div className="flexCenter h-fit w-full flex-col gap-5">
			<LoginForm />

			<button onClick={() => handleSignupLink()} className="activeStyle text-sm">
				이메일로 회원가입
			</button>

			<div className="h-[0.1px] w-full border " />

			<div className="flexCenter gap-3">
				<div className="size-12  ">
					<LoginButton type="Google" />
				</div>
				<div className="size-12 ">
					<LoginButton type="Kakao" />
				</div>
				<div className="size-12 ">
					<LoginButton type="Naver" />
				</div>
			</div>
		</div>
	);
};
