import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../api/auth';
import {LoginPopupStore} from '../../store/LoginPopupStore';
import {CommonInput} from '../input/CommonInput';

const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginFailed, setLoginFailed] = useState(false);
	const setLoginPopupIsOpenFalse = LoginPopupStore(state => state.setLoginPopupIsOpenFalse);

	const handleLogin = async () => {
		const fetchLogin = async () => {
			try {
				await login({email, password});
				window.location.reload();
			} catch (e) {
				setLoginFailed(true);
				console.error('로그인에 실패했습니다.', e);
			}
		};
		fetchLogin();
	};
	const handleSignupLink = () => {
		setLoginPopupIsOpenFalse();
		navigate('/signup');
	};

	return (
		<section className="flexCol w-full items-center gap-10 ">
			<div className="flexCol w-full gap-5 md:w-72 ">
				<CommonInput placeholder="이메일" icon="mail-line" value={email} onChange={setEmail} />
				<CommonInput
					placeholder="비밀번호"
					icon="key-2-line"
					value={password}
					onChange={setPassword}
					password
				/>
			</div>

			<button onClick={handleLogin} className={`buttonStylePrimary w-full md:w-72 `}>
				로그인
			</button>
			{loginFailed && (
				<p className="warning animate-shake">
					로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.
				</p>
			)}

			<p
				onClick={() => handleSignupLink()}
				className="cursor-pointer text-sm text-slate-400 transition-colors duration-300 hover:text-black"
			>
				이메일로 회원가입
			</p>
		</section>
	);
};

export default LoginForm;
