import {useState} from 'react';
import {login} from '../../api/auth';
import {CommonInput} from '../input/CommonInput';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';
import {getMember} from '../../api/member';
import ModalStore from '../../store/ModalStore';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const openToast = useOpenToastPopup();
	const {setIsOpenFalse} = ModalStore();

	const handleLogin = async () => {
		const fetchLogin = async () => {
			try {
				await login({email, password});
				await getMember();
				setIsOpenFalse();
				openToast({message: '로그인 성공!', type: 'success'});
			} catch (e) {
				console.error('로그인 실패', e);
				openToast({
					message: '이메일 또는 비밀번호를 확인하세요.',
					type: 'error',
				});
				setEmail('');
				setPassword('');
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
					inputType="password"
				/>
			</div>
			<button
				onClick={handleLogin}
				className={`buttonStylePrimary w-full`}
				disabled={password && email ? false : true}
			>
				로그인
			</button>
		</section>
	);
};

export default LoginForm;
