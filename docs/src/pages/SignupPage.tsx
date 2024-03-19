import SignupForm from '../component/auth/SignupForm';

const SignupPage = () => {
	return (
		<div className="flexCenter h-pageRoot flex-col gap-10 py-20">
			<p className="text-2xl font-semibold">이메일로 회원가입.</p>
			<SignupForm />
		</div>
	);
};

export default SignupPage;
