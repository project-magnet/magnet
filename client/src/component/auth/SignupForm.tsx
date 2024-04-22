import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../../api/auth';
import {WarningMessage} from '../common/WarningMessage';
import {LoginPopupStore} from '../../store/LoginPopupStore';
import {CommonInput} from '../input/CommonInput';
import {useOpenToastPopup} from '../../hooks/useOpenToastPopup';

const SignupForm = () => {
	const navigate = useNavigate();
	const {setLoginPopupIsOpenTrue} = LoginPopupStore();
	const openToast = useOpenToastPopup();
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
		nickName: '',
		phone: '',
		addressDto: {city: 'city', street: 'street'},
	});
	// 유효성 검사
	const [checkForm, setCheckForm] = useState({
		email: {focused: false, validated: false},
		username: {focused: false, validated: false},
		password: {focused: false, validated: false},
		nickName: {focused: false, validated: false},
		phone: {focused: false, validated: false},
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
			await signup(form);
			navigate('/');
			setLoginPopupIsOpenTrue();
			openToast({message: '회원가입 완료!', type: 'success'});
		} catch (e) {
			openToast({message: '회원가입에 실패했어요.', type: 'error'});
			console.error('회원가입에 실패했어요.', e);
		}
	};

	type valiateType = 'email' | 'username' | 'nickName' | 'phone' | 'password';
	const valiateField = (field: valiateType, value: string) => {
		setForm({...form, [field]: value});
		setCheckForm(prevState => {
			return validators[field].test(String(value))
				? {...prevState, [field]: {...prevState[field], validated: true}}
				: {...prevState, [field]: {...prevState[field], validated: false}};
		});
	};

	return (
		<section className="flexCol w-full items-center gap-10 *:w-10/12 *:md:w-96">
			<div className="flexCol gap-2">
				<CommonInput
					placeholder="이메일"
					icon="mail-line"
					value={form.email}
					onChange={val => valiateField('email', val)}
					onFocus={() => setCheckForm({...checkForm, email: {...checkForm.email, focused: true}})}
				/>
				<WarningMessage
					message="이메일 형식이어야 합니다."
					isSuccess={checkForm.email.validated || form.email.length === 0}
				/>

				<CommonInput
					inputType="password"
					placeholder="비밀번호"
					icon="key-2-line"
					value={form.password}
					onChange={val => valiateField('password', val)}
					onFocus={() =>
						setCheckForm({...checkForm, password: {...checkForm.password, focused: true}})
					}
				/>
				<WarningMessage
					message="최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다."
					isSuccess={checkForm.password.validated || form.password.length === 0}
				/>
			</div>

			<div className="flexCol gap-2">
				<CommonInput
					placeholder="실명"
					icon="user-line"
					value={form.username}
					onChange={val => valiateField('username', val)}
					onFocus={() =>
						setCheckForm({...checkForm, username: {...checkForm.username, focused: true}})
					}
				/>
				<WarningMessage
					message="한글 2자리 이상이여야 합니다."
					isSuccess={checkForm.username.validated || form.username.length === 0}
				/>

				<CommonInput
					placeholder="전화번호"
					icon="phone-line"
					value={form.phone}
					onChange={val => valiateField('phone', val)}
					onFocus={() => setCheckForm({...checkForm, phone: {...checkForm.phone, focused: true}})}
				/>
				<WarningMessage
					message="하이픈(-)을 포함한 9자리 이상 정수여야 합니다."
					isSuccess={checkForm.phone.validated || form.phone.length === 0}
				/>
			</div>

			<div className="flexCol">
				<CommonInput
					placeholder="닉네임"
					icon="aliens-line"
					value={form.nickName}
					onChange={val => valiateField('nickName', val)}
					onFocus={() =>
						setCheckForm({...checkForm, nickName: {...checkForm.nickName, focused: true}})
					}
				/>
				<WarningMessage
					message={'특수문자 제외 3자리 이상이여야 합니다.'}
					isSuccess={checkForm.nickName.validated || form.nickName.length === 0}
				/>
			</div>

			{/* 모든 validated가 참인가? */}
			<button
				onClick={handleSignup}
				className={`buttonStylePrimary`}
				disabled={!Object.values(checkForm).every(field => field.validated)}
			>
				회원가입
			</button>
		</section>
	);
};

export default SignupForm;
