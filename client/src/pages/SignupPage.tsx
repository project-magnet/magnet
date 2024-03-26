import SignupForm from '../component/auth/SignupForm';
import {LogoMagnet} from '../component/common/LogoMagnet';

const SignupPage = () => {
	return (
		<div className="flexCenter h-pageRoot flex-col gap-10 py-20">
			<LogoMagnet word="MAGNET" />
			<SignupForm />
		</div>
	);
};

export default SignupPage;
