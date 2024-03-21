import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../../api/auth';
import {WarningMessage} from '../common/WarningMessage';
import {LoginPopupStore} from '../../store/LoginPopupStore';
import {CommonInput} from '../common/CommonInput';

const SignupForm = () => {
	const navigate = useNavigate();
	const setLoginPopupIsOpenTrue = LoginPopupStore(state => state.setLoginPopupIsOpenTrue);
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
			navigate('/magnet');
			setLoginPopupIsOpenTrue();
		} catch (e) {
			console.error('회원가입에 실패했습니다.', e);
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
		<section className="flexCol w-full items-center gap-7">
			<div className="flexCol  w-11/12 gap-3 md:w-96">
				<CommonInput
					placeholder="이메일"
					icon="mail-line"
					value={form.email}
					onChange={val => valiateField('email', val)}
					onFocus={() => setCheckForm({...checkForm, email: {...checkForm.email, focused: true}})}
				/>
				<WarningMessage
					message="이메일 형식이어야 합니다."
					isSuccess={checkForm.email.validated}
					visible={checkForm.email.focused}
				/>

				<CommonInput
					password
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
					isSuccess={checkForm.password.validated}
					visible={checkForm.password.focused}
				/>
			</div>

			<div className="flexCol  w-11/12  gap-3 md:w-96">
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
					isSuccess={checkForm.username.validated}
					visible={checkForm.username.focused}
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
					isSuccess={checkForm.phone.validated}
					visible={checkForm.phone.focused}
				/>
			</div>

			<div className="flexCol  w-11/12  md:w-96">
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
					isSuccess={checkForm.nickName.validated}
					visible={checkForm.nickName.focused}
				/>
			</div>

			{/* 모든 validated가 참인가? */}
			<button
				onClick={handleSignup}
				className={`buttonStylePrimary w-11/12 md:w-96 ${
					!Object.values(checkForm).every(field => field.validated) && 'bg-opacity-20'
				}`}
				disabled={!Object.values(checkForm).every(field => field.validated)}
			>
				회원가입
			</button>
		</section>
	);
};

export default SignupForm;
