import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../../api/auth';
import {WarningMessage} from '../common/WarningMessage';
import {LoginPopupStore} from '../../store/LoginPopupStore';

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
		<section className="flexCol w-full items-center gap-10">
			<div className="flexCol  w-11/12 md:w-96">
				<div className={`flexCenter w-full gap-2 border-b-2 p-3  focus-within:border-additional2 `}>
					<i className={`ri-mail-line ri-lg ${form.email ? 'text-black' : 'text-slate-400'}`} />
					<input
						className="flex-grow text-xs outline-none "
						placeholder="이메일"
						value={form.email}
						onChange={e => valiateField('email', e.target.value)}
						onFocus={() => setCheckForm({...checkForm, email: {...checkForm.email, focused: true}})}
					/>
				</div>
				{checkForm.email.focused && (
					<WarningMessage
						message="이메일 형식이어야 합니다."
						isSuccess={checkForm.email.validated}
					/>
				)}
				<div className="flexCenter w-full gap-2 border-b-2   p-3 focus-within:border-additional2 ">
					<i className={`ri-key-2-line ri-lg ${form.password ? 'text-black' : 'text-slate-400'}`} />
					<input
						className="flex-grow text-xs outline-none"
						type="password"
						placeholder="비밀번호"
						value={form.password}
						onChange={e => valiateField('password', e.target.value)}
						onFocus={() =>
							setCheckForm({...checkForm, password: {...checkForm.password, focused: true}})
						}
					/>
				</div>
				{checkForm.password.focused && (
					<WarningMessage
						message="최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다."
						isSuccess={checkForm.password.validated}
					/>
				)}
			</div>

			<div className="flexCol  w-11/12  md:w-96">
				<div className="flexCenter w-full gap-2 border-b-2  p-3 focus-within:border-additional2 ">
					<i className={`ri-user-line ri-lg ${form.username ? 'text-black' : 'text-slate-400'}`} />
					<input
						className="flex-grow text-xs outline-none"
						placeholder="실명"
						value={form.username}
						onChange={e => valiateField('username', e.target.value)}
						onFocus={() =>
							setCheckForm({...checkForm, username: {...checkForm.username, focused: true}})
						}
					/>
				</div>
				{checkForm.username.focused && (
					<WarningMessage
						message="한글 2자리 이상이여야 합니다."
						isSuccess={checkForm.username.validated}
					/>
				)}
				<div className="flexCenter w-full gap-2 border-b-2  p-3 focus-within:border-additional2 ">
					<i className={`ri-phone-line ri-lg ${form.phone ? 'text-black' : 'text-slate-400'}`} />
					<input
						className="flex-grow text-xs outline-none"
						placeholder="전화번호"
						value={form.phone}
						onChange={e => valiateField('phone', e.target.value)}
						onFocus={() => setCheckForm({...checkForm, phone: {...checkForm.phone, focused: true}})}
					/>
				</div>
				{checkForm.phone.focused && (
					<WarningMessage
						message="하이픈(-)을 포함한 9자리 이상 정수여야 합니다."
						isSuccess={checkForm.phone.validated}
					/>
				)}
			</div>

			<div className="flexCol  w-11/12  md:w-96">
				<div className="flexCenter w-full gap-2 border-b-2  p-3 focus-within:border-additional2 ">
					<i
						className={`ri-aliens-line ri-lg ${form.nickName ? 'text-black' : 'text-slate-400'}`}
					/>
					<input
						className="flex-grow text-xs outline-none"
						placeholder="닉네임"
						value={form.nickName}
						onChange={e => valiateField('nickName', e.target.value)}
						onFocus={() =>
							setCheckForm({...checkForm, nickName: {...checkForm.nickName, focused: true}})
						}
					/>
				</div>
				{checkForm.nickName.focused && (
					<WarningMessage
						message={'특수문자 제외 3자리 이상이여야 합니다.'}
						isSuccess={checkForm.nickName.validated}
					/>
				)}
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
