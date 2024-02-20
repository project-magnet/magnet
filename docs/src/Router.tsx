import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignupPage from './pages/SignupPage';
import Authpage from './pages/AuthPage';
import MentorListPage from './pages/MentorListPage';
import PaymentCompletedPage from './pages/PaymentCompletedPage';
import UserPage from './pages/UserPage';
import CreateMentoringPage from './pages/CreateMentoringPage';
import PaymentFailedPage from './pages/PaymentFailedPage';

export const Router = () => {
	return (
		<Routes>
			<Route path="/magnet" Component={HomePage} />
			<Route path="/login" Component={LoginPage} />
			<Route path="/loginemail" Component={LoginEmailPage} />
			<Route path="/signup" Component={SignupPage} />
			<Route path="/auth" Component={Authpage} />
			<Route path="/mentorlist" Component={MentorListPage} />
			<Route path="/paymentcompleted" Component={PaymentCompletedPage} />
			<Route path="/paymentfailed" Component={PaymentFailedPage} />
			<Route path="/user" Component={UserPage} />
			<Route path="/creatementoring" Component={CreateMentoringPage} />
		</Routes>
	);
};
