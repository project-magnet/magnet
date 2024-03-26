import {useState} from 'react';
import {login} from '../../api/auth';
import {CommonInput} from '../input/CommonInput';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginFailed, setLoginFailed] = useState(false);

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

	return (
		<section className="flexCol w-full gap-10 py-10 md:w-96">
			<div className="flexCol w-full gap-5">
				<CommonInput placeholder="이메일" icon="mail-line" value={email} onChange={setEmail} />
				<CommonInput
					placeholder="비밀번호"
					icon="key-2-line"
					value={password}
					onChange={setPassword}
					password
				/>
			</div>
			<button
				onClick={handleLogin}
				className={`buttonStylePrimary w-full`}
				disabled={password && email ? false : true}
			>
				로그인
			</button>
			{loginFailed && (
				<p className="warning animate-shake">
					로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.
				</p>
			)}
		</section>
	);
};

export default LoginForm;
