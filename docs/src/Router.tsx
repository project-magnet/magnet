import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignupPage from './pages/SignupPage';
import Authpage from './pages/AuthPage';
import MentorPage from './pages/MentorPage';
import MentorListPage from './pages/MentorListPage';
import PaymentCompletedPage from './pages/PaymentCompletedPage';
import UserPage from './pages/UserPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/magnet" Component={HomePage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/loginemail" Component={LoginEmailPage} />
      <Route path="/signup" Component={SignupPage} />
      <Route path="/auth" Component={Authpage} />
      <Route path="/mentor" Component={MentorPage} />
      <Route path="/mentorlist" Component={MentorListPage} />
      <Route path="/paymentcompleted" Component={PaymentCompletedPage} />
      <Route path="/user" Component={UserPage} />
    </Routes>
  );
};
