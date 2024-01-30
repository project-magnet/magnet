import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import login from '../../utils/login';

const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);

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
		const loginResult = await login(email, password);
		console.log(loginResult.message);

		if (loginResult.isSuccess) {
			navigate('/magnet');
			window.location.reload();
		} else {
			setLoginFailed(true);
		}
	};

	return (
		<section className="w-full md:w-[500px] h-96 flexCol items-center justify-around">
			<div>
				<p className="text-slate-600 text-sm m-1">이메일</p>
				<input
					type="text"
					value={email}
					onChange={handleEmailChange}
					className="input"
					placeholder="이메일을 입력하세요."
				/>
			</div>
			<div>
				<p className="text-slate-600 text-sm m-1">비밀번호</p>
				<input
					type="password"
					value={password}
					onChange={handlePasswordChange}
					className="input"
					placeholder="비밀번호를 입력하세요."
				/>
			</div>
			<button
				disabled={!isFormValid}
				onClick={handleLogin}
				type="button"
				className={`w-96 h-12 text-white rounded-lg ${isFormValid ? 'bg-blue-500' : 'bg-gray-300'}`}
			>
				로그인
			</button>

			{loginFailed && (
				<p className="text-red-500 text-sm">
					로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.
				</p>
			)}

			<Link to="/signup">
				<p className="text-sm text-slate-400">이메일로 회원가입</p>
			</Link>
		</section>
	);
};

export default LoginForm;
