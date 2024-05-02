import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../../api/auth';
import {WarningMessage} from '../common/WarningMessage';
import {CommonInput} from '../input/CommonInput';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';

const SignupForm = () => {
	const navigate = useNavigate();
	const openToast = useOpenToastPopup();
	const [userInfo, setUserInfo] = useState({
		form: {
			email: '',
			username: '',
			password: '',
			nickName: '',
			phone: '',
			addressDto: {city: 'city', street: 'street'},
		},
		validatedForm: {
			email: false,
			username: false,
			password: false,
			nickName: false,
			phone: false,
		},
	});
	// 유효성 검사 정규식
	const validators = {
		email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
		username: /^[가-힣]{2,}$/,
		nickName: /^[A-Za-z0-9-가-힣]{3,}$/,
		phone: /^([0-9]{2}|[0-9]{3})-([0-9]{3,4})-([0-9]{4})$/,
		password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	};

	const handleSignup = async () => {
		try {
			await signup(userInfo.form);
			navigate('/');
			openToast({message: '회원가입 완료!', type: 'success'});
		} catch (e) {
			openToast({message: '회원가입에 실패했어요.', type: 'error'});
			console.error('회원가입에 실패했어요.', e);
		}
	};

	const valiateField = (
		field: 'email' | 'username' | 'nickName' | 'phone' | 'password',
		value: string,
	) => {
		setUserInfo(pre => ({
			form: {...pre.form, [field]: value},
			validatedForm: {...pre.validatedForm, [field]: validators[field].test(String(value))},
		}));
	};

	return (
		<section className="flexCol w-full items-center gap-10 *:w-10/12 *:md:w-96">
			<div className="flexCol gap-2">
				<CommonInput
					placeholder="이메일"
					icon="mail-line"
					value={userInfo.form.email}
					onChange={val => valiateField('email', val)}
				/>
				<WarningMessage
					message="이메일 형식이어야 합니다."
					isSuccess={userInfo.validatedForm.email || userInfo.form.email.length === 0}
				/>

				<CommonInput
					type="password"
					placeholder="비밀번호"
					icon="key-2-line"
					value={userInfo.form.password}
					onChange={val => valiateField('password', val)}
				/>
				<WarningMessage
					message="최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다."
					isSuccess={userInfo.validatedForm.password || userInfo.form.password.length === 0}
				/>
			</div>

			<div className="flexCol gap-2">
				<CommonInput
					placeholder="실명"
					icon="user-line"
					value={userInfo.form.username}
					onChange={val => valiateField('username', val)}
				/>
				<WarningMessage
					message="한글 2자리 이상이여야 합니다."
					isSuccess={userInfo.validatedForm.username || userInfo.form.username.length === 0}
				/>

				<CommonInput
					placeholder="전화번호"
					icon="phone-line"
					value={userInfo.form.phone}
					onChange={val => valiateField('phone', val)}
				/>
				<WarningMessage
					message="하이픈(-)을 포함한 9자리 이상 정수여야 합니다."
					isSuccess={userInfo.validatedForm.phone || userInfo.form.phone.length === 0}
				/>
			</div>

			<div className="flexCol">
				<CommonInput
					placeholder="닉네임"
					icon="aliens-line"
					value={userInfo.form.nickName}
					onChange={val => valiateField('nickName', val)}
				/>
				<WarningMessage
					message={'특수문자 제외 3자리 이상이여야 합니다.'}
					isSuccess={userInfo.validatedForm.nickName || userInfo.form.nickName.length === 0}
				/>
			</div>

			{/* 모든 validated가 참인가? */}
			<button
				onClick={handleSignup}
				className={`buttonStylePrimary`}
				disabled={!Object.values(userInfo.validatedForm).every(validatedEl => validatedEl)}
			>
				회원가입
			</button>
		</section>
	);
};

export default SignupForm;
