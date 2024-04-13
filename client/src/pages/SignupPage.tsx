import SignupForm from '../component/auth/SignupForm';
import {LogoTickle} from '../component/common/LogoTickle';

const SignupPage = () => {
	return (
		<div className="flexCenter h-pageRoot flex-col gap-10 py-20">
			<LogoTickle word="MAGNET" />
			<SignupForm />
		</div>
	);
};

export default SignupPage;
