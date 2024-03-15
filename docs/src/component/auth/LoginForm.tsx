import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../api/auth';
import {LoginPopupStore} from '../../store/LoginPopupStore';

const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const setLoginPopupIsOpenFalse = LoginPopupStore(state => state.setLoginPopupIsOpenFalse);

	const handleEmailChange = (e: {target: {value: string}}) => {
		const newEmail = e.target.value;
		const isValidEmail = newEmail.includes('@');

		setEmail(newEmail);
		setIsFormValid(isValidEmail && password.length > 0);
	};

	const handlePasswordChange = (e: {target: {value: string}}) => {
		const newPassword = e.target.value;

		setPassword(newPassword);
		setIsFormValid(email.includes('@') && newPassword.length > 0);
	};

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
		<section className="flexCol inputStyle items-center gap-5">
			<div>
				<p>이메일</p>
				<input
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="이메일을 입력하세요."
					className="placeholder:text-xs"
				/>
			</div>
			<div>
				<p>비밀번호</p>
				<input
					type="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="비밀번호를 입력하세요."
					className="placeholder:text-xs"
				/>
			</div>

			<button
				disabled={!isFormValid}
				onClick={handleLogin}
				className={`bg-primary text-white ${!isFormValid && 'bg-opacity-20'}`}
			>
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
